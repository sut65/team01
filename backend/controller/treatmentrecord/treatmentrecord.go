package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /treatmentrecords
func CreateTreatmentRecord(c *gin.Context) {
	var employee entity.Employee
	var diagnosisrecord entity.DiagnosisRecord
	var treatmentrecord entity.TreatmentRecord

	if err := c.ShouldBindJSON(&treatmentrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ค้นหา Doctor ด้วย id
	if tx := entity.DB().Table("employees").Where("id = ?", treatmentrecord.DoctorID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}
	//ค้นหา DiagnosisRecord ด้วย id
	if tx := entity.DB().Table("diagnosis_records").Where("id = ?", treatmentrecord.DiagnosisRecordID).First(&diagnosisrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	var items []entity.MedicineOrder
	for _, orderItem := range treatmentrecord.MedicineOrders {
		var medicine entity.Medicine
		// 14: ค้นหา medicine ด้วย id
		if tx := entity.DB().Where("id = ?", orderItem.MedicineID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "medicine not found"})
			return
		}
		// 15: สร้าง MedicineOrderItem
		it := entity.MedicineOrder{
			Medicine:    medicine,
			OrderAmount: orderItem.OrderAmount,
		}
		if _, err := govalidator.ValidateStruct(it); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		items = append(items, it)
	}

	//สร้าง TreamentRecord
	tr := entity.TreatmentRecord{

		Doctor:          employee,
		DiagnosisRecord: diagnosisrecord,
		Treatment:       treatmentrecord.Treatment,
		Note:            treatmentrecord.Note,
		Appointment:     treatmentrecord.Appointment,
		MedicineOrders:  items,
		Date:            treatmentrecord.Date,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(tr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// validate boolean
	if _, err := entity.BooleanNotNull(tr.Appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//บันทึก
	if err := entity.DB().Create(&tr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tr})

}

// GET /treatmentrecord/:id
func GetTreatmentRecord(c *gin.Context) {
	var treatmentrecord entity.TreatmentRecord
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM treatment_records WHERE id = ?", id).
		Preload("Doctor").
		Preload("Doctor.Title").
		Preload("DiagnosisRecord").
		Preload("DiagnosisRecord.HistorySheet").
		Preload("DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("MedicineOrders.Medicine").
		Find(&treatmentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatmentrecord})
}

// GET /treatmentrecords/
func ListTreatmentRecords(c *gin.Context) {
	var treatmentrecords []entity.TreatmentRecord
	if err := entity.DB().Raw("SELECT * FROM treatment_records").
		Preload("Doctor").
		Preload("Doctor.Title").
		Preload("DiagnosisRecord").
		Preload("DiagnosisRecord.HistorySheet").
		Preload("DiagnosisRecord.HistorySheet.PatientRegister").
		Preload("MedicineOrders.Medicine").
		Find(&treatmentrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatmentrecords})
}

// DELETE /treamentrecords/:id
func DeleteTreatmentRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM treatment_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatmentrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /treatmentrecords
func UpdateTreatmentRecord(c *gin.Context) {
	var payload entity.TreatmentRecord
	var employee entity.Employee
	var diagnosisrecord entity.DiagnosisRecord
	// var medicineorder entity.MedicineOrder
	var treatmentrecord entity.TreatmentRecord

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.ID).First(&treatmentrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": ""})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.DiagnosisRecordID).First(&diagnosisrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnosis_record_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.DoctorID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor_id not found"})
		return
	}

	var items []entity.MedicineOrder
	for _, orderItem := range payload.MedicineOrders {
		var medicine entity.Medicine
		// 14: ค้นหา medicine ด้วย id
		if tx := entity.DB().Where("id = ?", orderItem.MedicineID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "medicine not found"})
			return
		}
		// 15: สร้าง MedicineOrderItem
		it := entity.MedicineOrder{
			Medicine:    medicine,
			OrderAmount: orderItem.OrderAmount,
		}
		if _, err := govalidator.ValidateStruct(it); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		items = append(items, it)
	}

	updatetreatmentrecord := entity.TreatmentRecord{
		Doctor:          employee,
		DiagnosisRecord: diagnosisrecord,
		Treatment:       payload.Treatment,
		Note:            payload.Note,
		Appointment:     payload.Appointment,
		MedicineOrders:  items,
		Date:            payload.Date,
	}
	if _, err := govalidator.ValidateStruct(updatetreatmentrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// validate boolean
	if _, err := entity.BooleanNotNull(updatetreatmentrecord.Appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", treatmentrecord.ID).Updates(&updatetreatmentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": treatmentrecord})
}