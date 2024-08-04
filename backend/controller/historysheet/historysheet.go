package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /historysheets
func CreateHistorySheet(c *gin.Context) {
	var historysheet entity.HistorySheet
	var patientregister entity.PatientRegister
	var employee entity.Employee
	var drugallergy entity.DrugAllergy

	if err := c.ShouldBindJSON(&historysheet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Table("patient_registers").Where("id = ?", historysheet.PatientRegisterID).First(&patientregister); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientregister not found"})
		return
	}
	if tx := entity.DB().Table("employees").Where("id = ?", historysheet.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nurse not found"})
		return
	}
	if tx := entity.DB().Table("drug_allergies").Where("id = ?", historysheet.DrugAllergyID).First(&drugallergy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drugallergy not found"})
		return
	}
	h := entity.HistorySheet{
		Weight:                 historysheet.Weight,
		Height:                 historysheet.Height,
		Temperature:            historysheet.Temperature,
		SystolicBloodPressure:  historysheet.SystolicBloodPressure,
		DiastolicBloodPressure: historysheet.DiastolicBloodPressure,
		HeartRate:              historysheet.HeartRate,
		RespiratoryRate:        historysheet.RespiratoryRate,
		OxygenSaturation:       historysheet.OxygenSaturation,
		DrugAllergySymtom:      historysheet.DrugAllergySymtom,
		PatientSymtom:          historysheet.PatientSymtom,
		PatientRegister:        patientregister,
		Employee:               employee,
		DrugAllergy:            drugallergy,
	}
	if _, err := govalidator.ValidateStruct(h); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&h).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": h})
}

// GET /historysheet/:id
func GetHistorySheet(c *gin.Context) {
	var historysheet entity.HistorySheet
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM history_sheets WHERE id = ?", id).
		Preload("PatientRegister").
		Preload("Employee").
		Preload("DrugAllergy").
		Find(&historysheet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": historysheet})
}

// GET /historysheets
func ListHistorySheets(c *gin.Context) {
	var historysheets []entity.HistorySheet
	if err := entity.DB().Raw("SELECT * FROM history_sheets").
		Preload("PatientRegister").
		Preload("PatientRegister.PatientRegisterGender").
		Preload("Employee").
		Preload("DrugAllergy").
		Find(&historysheets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": historysheets})
}

// DELETE /historysheets/:id
func DeleteHistorySheet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM history_sheets WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "historysheet not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /historysheets
func UpdateHistorySheet(c *gin.Context) {
	var payload entity.HistorySheet
	var historysheet entity.HistorySheet
	var patientregister entity.PatientRegister
	var employee entity.Employee
	var drugallergy entity.DrugAllergy
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.ID).First(&historysheet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "historysheet_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.PatientRegisterID).First(&patientregister); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientregister_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.Employee.RoleID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nurse_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.DrugAllergyID).First(&drugallergy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drugallergy_id not found"})
		return
	}
	updatehistorysheet := entity.HistorySheet{
		Weight:                 payload.Weight,
		Height:                 payload.Height,
		Temperature:            payload.Temperature,
		SystolicBloodPressure:  payload.SystolicBloodPressure,
		DiastolicBloodPressure: payload.DiastolicBloodPressure,
		HeartRate:              payload.HeartRate,
		RespiratoryRate:        payload.RespiratoryRate,
		OxygenSaturation:       payload.OxygenSaturation,
		DrugAllergySymtom:      payload.DrugAllergySymtom,
		PatientSymtom:          payload.PatientSymtom,
		PatientRegister:        patientregister,
		Employee:               employee,
		DrugAllergy:            drugallergy,
	}
	if _, err := govalidator.ValidateStruct(updatehistorysheet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", historysheet.ID).Updates(&updatehistorysheet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": historysheet})
}
