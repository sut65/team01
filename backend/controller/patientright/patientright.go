package controller

import (
	"net/http"
	//"testing/quick"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// Post /Patientright
func CreatePatientrights(c *gin.Context) {

	var	patientright entity.PatientRight
	var righttype entity.RightType
	var hospital entity.Hospital
	var employee entity.Employee

	// bind เข้าตัวแปร patientright
	if err := c.ShouldBindJSON(&patientright); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา righttype ด้วย id
	if tx := entity.DB().Where("id = ?", patientright.RightTypeID).First(&righttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "righttype not found"})
		return
	}

	// : ค้นหา hospital ด้วย id
	if tx := entity.DB().Where("id = ?", patientright.HospitalID).First(&hospital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Hospital not found"})
		return
	}

	// : ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", patientright.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// : สร้าง patient
	pt := entity.PatientRight{
		RightType:      	righttype,        	// โยงความสัมพันธ์กับ Entity PatientType
		Hospital:      		hospital,       	// โยงความสัมพันธ์กับ Entity PatientRight
		Employee: 			employee,
		DateRocrcord: 		patientright.DateRocrcord,	// ตั่งค่าของ HN ให้เท่ากับค่าที่รับมา
		Note:				patientright.Note,	// ตั่งค่าของ Note ให้เท่ากับค่าที่รับมา
	}

	// : ขั้นตอนการ validate ข้อมูล
	if _, err := govalidator.ValidateStruct(pt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})
}

// GET /patientright/:id
func GetPatientRights(c *gin.Context) {
	var patientright entity.PatientRight
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM patient_rights WHERE id = ?", id).Scan(&patientright).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientright})
}

// GET /patientrights
func ListPatientRights(c *gin.Context) {
	var patientrights []entity.PatientRight
	if err := entity.DB().Raw("SELECT * FROM patient_rights").Scan(&patientrights).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientrights})
}

// DELETE /patientrights/:id
func DeletePatientRights(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patient_rights WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /patientrights
func UpdatePatientRights(c *gin.Context) {
	var patientright entity.PatientRight
	if err := c.ShouldBindJSON(&patientright); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patientright.ID).First(&patientright); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
		return
	}

	if err := entity.DB().Save(&patientright).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":patientright})
}