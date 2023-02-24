package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST	/diagnosisrecords
func CreateDiagnosisRecord(c *gin.Context) {
	var employee entity.Employee
	var historysheet entity.HistorySheet
	var disease entity.Disease
	var diagnosisrecord entity.DiagnosisRecord

	if err := c.ShouldBindJSON(&diagnosisrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา Doctor ด้วย id
	if tx := entity.DB().Table("employees").Where("id = ?", diagnosisrecord.DoctorID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//ค้นหา HistorySheet ด้วย id
	if tx := entity.DB().Table("history_sheets").Where("id = ?", diagnosisrecord.HistorySheetID).First(&historysheet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "historysheeet not found"})
		return
	}

	//ค้นหา Disease ด้วย id
	if tx := entity.DB().Table("diseases").Where("id = ?", diagnosisrecord.DiseaseID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	//สร้าง DiagnosisRecord
	dr := entity.DiagnosisRecord{
		Doctor:             employee,
		HistorySheet:       historysheet,
		Disease:            disease,
		MedicalCertificate: diagnosisrecord.MedicalCertificate,
		Examination:        diagnosisrecord.Examination,
		Date:               diagnosisrecord.Date,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(dr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// vaidate boolean
	if _, err := entity.CheckBool(dr.MedicalCertificate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//บันทึก
	if err := entity.DB().Create(&dr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dr})

}

// GET /diagnosisrecord/:id
func GetDiagnosisRecord(c *gin.Context) {
	var diagnosisrecord entity.DiagnosisRecord
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM diagnosis_records WHERE id = ?", id).
		Preload("Doctor").
		Preload("Doctor.Title").
		Preload("HistorySheet").
		Preload("HistorySheet.PatientRegister").
		Preload("Disease").
		Find(&diagnosisrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diagnosisrecord})
}

// GET /diagnosisrecords
func ListDiagnosisRecords(c *gin.Context) {
	var diagnosisrecords []entity.DiagnosisRecord
	if err := entity.DB().Raw("SELECT * FROM diagnosis_records").
		Preload("Doctor").
		Preload("Doctor.Title").
		Preload("HistorySheet").
		Preload("HistorySheet.PatientRegister").
		Preload("Disease").
		Find(&diagnosisrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diagnosisrecords})
}

// DELETE /diagnosisrecords/:id
func DeleteDiagnosisRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM diagnosis_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnosisrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /diagnosisrecords
func UpdateDiagnosisRecord(c *gin.Context) {
	var payload entity.DiagnosisRecord
	var employee entity.Employee
	var historysheet entity.HistorySheet
	var disease entity.Disease
	var diagnosisrecord entity.DiagnosisRecord

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.ID).First(&diagnosisrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnosis_record_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.HistorySheetID).First(&historysheet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "history_sheet_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.DoctorID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.DiseaseID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease_id not found"})
		return
	}

	updatediagnosisrecord := entity.DiagnosisRecord{
		Doctor:             employee,
		HistorySheet:       historysheet,
		Disease:            disease,
		MedicalCertificate: payload.MedicalCertificate,
		Examination:        payload.Examination,
		Date:               payload.Date,
	}
	if _, err := govalidator.ValidateStruct(updatediagnosisrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := entity.CheckBool(updatediagnosisrecord.MedicalCertificate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", diagnosisrecord.ID).Updates(&updatediagnosisrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": diagnosisrecord})
}