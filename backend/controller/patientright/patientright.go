package controller

import (
	"net/http"
	//"testing/quick"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// Post /patientrights
func CreatePatientrights(c *gin.Context) {

	var patientright entity.PatientRight
	var righttype entity.RightType
	var hospital entity.Hospital
	var employee entity.Employee
	var patientregister entity.PatientRegister

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

	// : ค้นหา PatientRegister ด้วย id
	if tx := entity.DB().Where("id = ?", patientright.PatientRegisterID).First(&patientregister); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient register not found"})
		return
	}

	// : สร้าง patient
	pt := entity.PatientRight{
		RightType:       righttype,               // โยงความสัมพันธ์กับ Entity PatientType
		Hospital:        hospital,                // โยงความสัมพันธ์กับ Entity PatientRight
		Employee:        employee,                // โยงความสัมพันธ์กับ Entity PatientRegister
		PatientRegister: patientregister,         // โยงความสัมพันธ์กับ Entity Employee
		DateRecord:      patientright.DateRecord, // ตั่งค่าของ HN ให้เท่ากับค่าที่รับมา
		Note:            patientright.Note,       // ตั่งค่าของ Note ให้เท่ากับค่าที่รับมา
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
	if err := entity.DB().Raw("SELECT * FROM patient_rights").
		Preload("PatientRegister").
		Preload("Employee").
		Preload("Hospital").
		Preload("RightType").
		Find(&patientrights).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patientrights})
}

// GET /patientrights/patientregister/:id
func GetPatientRightsByRegister(c *gin.Context) {
	id := c.Param("id")
	var patientrights entity.PatientRight
	if err := entity.DB().Raw("SELECT * FROM patient_rights WHERE patient_register_id = ?", id).
		Preload("PatientRegister").
		Preload("Employee").
		Preload("Hospital").
		Preload("RightType").
		Find(&patientrights).Error; err != nil {
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
	var updatepatientright entity.PatientRight
	var patientright entity.PatientRight
	var righttype entity.RightType
	var hospital entity.Hospital
	var employee entity.Employee

	// bind เข้าตัวแปร patientright
	if err := c.ShouldBindJSON(&updatepatientright); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา righttype ด้วย id
	if tx := entity.DB().Where("id = ?", updatepatientright.RightTypeID).First(&righttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "righttype not found"})
		return
	}

	// : ค้นหา hospital ด้วย id
	if tx := entity.DB().Where("id = ?", updatepatientright.HospitalID).First(&hospital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Hospital not found"})
		return
	}

	// : ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", updatepatientright.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// :   update patient
	uppt := entity.PatientRight{
		RightType:  righttype, // โยงความสัมพันธ์กับ Entity PatientType
		Hospital:   hospital,  // โยงความสัมพันธ์กับ Entity PatientRight
		Employee:   employee,
		DateRecord: updatepatientright.DateRecord, // ตั่งค่าของ HN ให้เท่ากับค่าที่รับมา
		Note:       updatepatientright.Note,       // ตั่งค่าของ Note ให้เท่ากับค่าที่รับมา
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit test
	if _, err := govalidator.ValidateStruct(uppt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", patientright.ID).Updates(&uppt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Save(&historysheet).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": patientright})
}
