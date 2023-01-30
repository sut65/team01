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

	// : ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", medicinerecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// : สร้าง medicinerecord
	mr := entity.MedicineRecord{
		TreatmentRecord: treatmentrecord,           // โยงความสัมพันธ์กับ Entity TreatmentRecord
		Employee:        employee,                  // โยงความสัมพันธ์กับ Entity Employee
		Advicetext:      medicinerecord.Advicetext, // ตั้งค่าฟิลด์ Advicetext
		MedTime:         medicinerecord.MedTime,    // ตั้งค่าฟิลด์ MedicineRecord
	}

	// : ขั้นตอนการ validate ข้อมูล
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
func Getmedicinerecord(c *gin.Context) {
	var medicinerecord entity.MedicineRecord
	id := c.Param("id")
	if err := entity.DB().Preload("TreatmentRecord").Preload("Employee").Raw("SELECT * FROM medicine_record WHERE id = ?", id).Find(&medicinerecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicinerecord})
}

// GET /medicinerecords
func Listmedicinerecords(c *gin.Context) {
	var medicinerecords []entity.MedicineRecord
	if err := entity.DB().Preload("TreatmentRecord").Preload("Employee").Raw("SELECT * FROM medicine_record").Find(&medicinerecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicinerecords})
}

// DELETE /medicinerecords/:id
func Deletemedicinerecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM medicine_record WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicinerecord not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /medicinerecords
func Updatemedicinerecord(c *gin.Context) {
	var medicinerecord entity.MedicineRecord
	if err := c.ShouldBindJSON(&medicinerecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", medicinerecord.ID).First(&medicinerecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicinerecord not found"})
		return
	}

	if err := entity.DB().Save(&medicinerecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicinerecord})
}
