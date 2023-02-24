package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /payments
func CreatePayment(c *gin.Context) {

	var paymenttype entity.PaymentType
	var patientright entity.PatientRight
	var employee entity.Employee
	var medicinerecord entity.MedicineRecord
	var payment entity.Payment

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา patientright ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PatientRightID).First(&patientright); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
		return
	}

	// : ค้นหา paymenttype ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PaymentTypeID).First(&paymenttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype not found"})
		return
	}

	// : ค้นหา cashier ด้วย id
	if tx := entity.DB().Where("id = ?", payment.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cashier not found"})
		return
	}

	// : ค้นหา MedicineRecord ด้วย id
	if tx := entity.DB().Where("id = ?", payment.MedicineRecordID).First(&medicinerecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicinerecord not found"})
		return
	}
	entity.DB().Joins("Role").Find(&employee)

	// if employee.Role.Name != "Cashier" {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "The data recorder should be a Cashier"})
	// 	return
	// }
	// entity.DB().Joins("Role").Find(&cashier)

	// : สร้าง Payment
	pm := entity.Payment{
		PatientRight:     patientright,        // โยงความสัมพันธ์กับ Entity PatientRight
		PaymentType:      paymenttype,         // โยงความสัมพันธ์ Entity PaymentType
		Employee:         employee,            // โยงความสัมพันธ์กับ Entity cashier
		MedicineRecordID: &medicinerecord.ID,  // โยงความสัมพันธ์กับ Entity MedicineRecord
		PaymentTime:      payment.PaymentTime, // ตั้งค่าฟิลด์ PaymentTime
		Total:            payment.Total,       //ตั้งค่าฟิลด์ Total

	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if pm.Total == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Total cannot be zero"})
		return
	}

	// : บันทึก payment
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pm})

}

// GET /GetMedbyPatient
func GetMedbyPatient(c *gin.Context) {
	var medicinerecord []entity.MedicineRecord
	id := c.Param("id")
	if err := entity.DB().
		Preload("TreatmentRecord.DiagnosisRecord").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Preload("StatusMed").
		Raw("SELECT * FROM medicinerecord WHERE patientregister.id = ?", id).
		Find(&medicinerecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicinerecord})
}

// GET /payment/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().
		Preload("PatientRight").
		Preload("MedicineRecord").
		Preload("PaymentType").
		Preload("MedicineRecord.TreatmentRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Raw("SELECT * FROM payments WHERE id = ?", id).
		Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payments
func ListPayments(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().
		Preload("PatientRight").
		Preload("PaymentType").
		Preload("MedicineRecord").
		Preload("MedicineRecord.TreatmentRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}
func UpdatePayment(c *gin.Context) {

	var payload entity.Payment
	var newpayload entity.Payment

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ID).First(&newpayload); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	newpayload.PatientRightID = payload.PatientRightID
	newpayload.PaymentTypeID = payload.PaymentTypeID
	newpayload.MedicineRecordID = payload.MedicineRecordID
	newpayload.PaymentTime = payload.PaymentTime
	newpayload.Total = payload.Total

	updatepm := entity.Payment{
		PatientRightID:   newpayload.PatientRightID,   // โยงความสัมพันธ์กับ Entity PatientRight
		PaymentTypeID:    newpayload.PaymentTypeID,    // โยงความสัมพันธ์ Entity PaymentType
		MedicineRecordID: newpayload.MedicineRecordID, // โยงความสัมพันธ์กับ Entity MedicineRecord
		PaymentTime:      newpayload.PaymentTime,      // ตั้งค่าฟิลด์ PaymentTime
		Total:            newpayload.Total,            //ตั้งค่าฟิลด์ Total

	}
	if _, err := govalidator.ValidateStruct(updatepm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newpayload).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newpayload})
}

// DELETE /payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	var payments []entity.Payment

	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	if err := entity.DB().
		Preload("PatientRight").
		Preload("PaymentType").
		Preload("MedicineRecord").
		Preload("MedicineRecord.TreatmentRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": payments})
}
