package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"

	"github.com/asaskevich/govalidator"
)

// POST /medicinerecord
func CreateMedicineRecord(c *gin.Context) {

	var employee entity.Employee
	var treatmentrecord entity.TreatmentRecord
	var statusmed entity.StatusMed
	var medicinerecord entity.MedicineRecord

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ จะถูก bind เข้าตัวแปร medicinerecord
	if err := c.ShouldBindJSON(&medicinerecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา TreatmentRecord ด้วย id
	if tx := entity.DB().Where("id = ?", medicinerecord.TreatmentRecordID).First(&treatmentrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TreatmentRecord not found"})
		return
	}

	// : ค้นหา StatusMed ด้วย id
	if tx := entity.DB().Where("id = ?", medicinerecord.StatusMedID).First(&statusmed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "StatusMed not found"})
		return
	}
	// : ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", medicinerecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pharmacist not found"})
		return
	}
	entity.DB().Joins("Role").Find(&employee)

	if employee.Role.Name != "Pharmacist" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data recorder should be a Pharmacist"})
		return
	}

	// : สร้าง medicinerecord
	mr := entity.MedicineRecord{
		TreatmentRecord: treatmentrecord,           // โยงความสัมพันธ์กับ Entity TreatmentRecord
		Employee:        employee,                  // โยงความสัมพันธ์กับ Entity Employee
		StatusMed:       statusmed,                 // โยงความสัมพันธ์กับ Entity StatusMed
		Advicetext:      medicinerecord.Advicetext, // ตั้งค่าฟิลด์ Advicetext
		MedTime:         medicinerecord.MedTime,    // ตั้งค่าฟิลด์ MedicineRecord
	}

	// // : ขั้นตอนการ validate ข้อมูล
	if _, err := govalidator.ValidateStruct(mr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mr})
}

// GET /medicinerecord/:id
func GetMedicineRecord(c *gin.Context) {
	var medicinerecord entity.MedicineRecord
	id := c.Param("id")
	if err := entity.DB().
		Preload("TreatmentRecord").
		Preload("TreatmentRecord.MedicineOrders").
		Preload("TreatmentRecord.MedicineOrders.Medicine").
		Preload("TreatmentRecord.DiagnosisRecord").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Preload("StatusMed").
		Raw("SELECT * FROM medicine_records WHERE id = ?", id).
		Find(&medicinerecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicinerecord})
}

// GET /medicinerecord/:id
func GetTreatmentRecordforMed(c *gin.Context) {
	var medicinerecord entity.MedicineRecord
	id := c.Param("id")
	if err := entity.DB().
		Preload("TreatmentRecord").
		Preload("TreatmentRecord.MedicineOrders").
		Preload("TreatmentRecord.MedicineOrders.Medicine").
		Preload("TreatmentRecord.DiagnosisRecord").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Preload("StatusMed").
		Raw("SELECT * FROM medicine_records WHERE id = ?", id).
		Find(&medicinerecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicinerecord})
}

// GET /medicinerecords
func ListMedicineRecords(c *gin.Context) {
	var medicinerecords []entity.MedicineRecord
	if err := entity.DB().
		Preload("TreatmentRecord").
		Preload("TreatmentRecord.MedicineOrders").
		Preload("TreatmentRecord.MedicineOrders.Medicine").
		Preload("TreatmentRecord.DiagnosisRecord").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Preload("StatusMed").
		Raw("SELECT * FROM medicine_records").
		Find(&medicinerecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicinerecords})
}

// DELETE /medicinerecords/:id
func DeleteMedicineRecord(c *gin.Context) {
	id := c.Param("id")
	var medicinerecords entity.MedicineRecord
	if tx := entity.DB().Exec("DELETE FROM medicine_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicinerecord not found"})
		return
	}
	if err := entity.DB().Preload("TreatmentRecord").
		Preload("TreatmentRecord.MedicineOrders").
		Preload("TreatmentRecord.MedicineOrders.Medicine").
		Preload("TreatmentRecord.DiagnosisRecord").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet").
		Preload("TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("Employee").
		Preload("StatusMed").
		Raw("SELECT * FROM medicine_records").
		Find(&medicinerecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /medicinerecords
func UpdateMedicineRecord(c *gin.Context) {
	// var medicinerecord entity.MedicineRecord

	// var pharmacist entity.Employee
	// var treatmentrecord entity.TreatmentRecord
	// var statusmed entity.StatusMed
	var payload entity.MedicineRecord
	var newpayload entity.MedicineRecord

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ID).First(&newpayload); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicinerecord not found"})
		return
	}

	newpayload.TreatmentRecord = payload.TreatmentRecord
	newpayload.StatusMed = payload.StatusMed
	newpayload.Advicetext = payload.Advicetext
	newpayload.MedTime = payload.MedTime
	updatemr := entity.MedicineRecord{
		TreatmentRecord: newpayload.TreatmentRecord, // โยงความสัมพันธ์กับ Entity TreatmentRecord
		StatusMed:       newpayload.StatusMed,       // โยงความสัมพันธ์กับ Entity StatusMed
		Advicetext:      newpayload.Advicetext,      // ตั้งค่าฟิลด์ Advicetext
		MedTime:         newpayload.MedTime,         // ตั้งค่าฟิลด์ MedicineRecord
	}
	if _, err := govalidator.ValidateStruct(updatemr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newpayload).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": newpayload})
}
