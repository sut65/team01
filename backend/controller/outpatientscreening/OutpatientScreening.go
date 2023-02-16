package controller

import (
	"net/http"

	"github.com/sut65/team01/entity"
	//"github.com/ChatreeDev/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

//commit again

// POST /outpatientscreenings
func CreateOutpatientScreenings(c *gin.Context) {

	var outpatient_screenings entity.OutpatientScreening
	var history_sheets entity.HistorySheet
	var emergency_levels entity.EmergencyLevel
	var high_blood_pressure_levels entity.HighBloodPressureLevel
	var diabetes_levels entity.DiabetesLevel
	var obesity_levels entity.ObesityLevel

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร OutpatientScreening
	if err := c.ShouldBindJSON(&outpatient_screenings); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา HistorySheet ด้วย id
	if tx := entity.DB().Table("history_sheets").Where("id = ?", outpatient_screenings.HistorySheetID).First(&history_sheets); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HistorySheet not found"})
		return
	}

	// 12: ค้นหา Emergency Level ด้วย id
	if tx := entity.DB().Table("emergency_levels").Where("id = ?", outpatient_screenings.EmergencyLevelID).First(&emergency_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Emergency Level not found"})
		return
	}

	// 13: ค้นหา HighBloodPressure Level ด้วย id
	if tx := entity.DB().Table("high_blood_pressure_levels").Where("id = ?", outpatient_screenings.HighBloodPressureLevelID).First(&high_blood_pressure_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HighBlood Pressure Level type not found"})
		return
	}

	// 14: ค้นหา Diebetes Level ด้วย id
	if tx := entity.DB().Table("diabetes_Levels").Where("id = ?", outpatient_screenings.DiabetesLevelID).First(&diabetes_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Diabetes Level type not found"})
		return
	}

	// 15: ค้นหา Obesity Level ด้วย id
	if tx := entity.DB().Table("obesity_levels").Where("id = ?", outpatient_screenings.ObesityLevelID).First(&obesity_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Obesity Level type not found"})
		return
	}

	// 16: สร้าง OutpatientScreening
	wv := entity.OutpatientScreening{
		HistorySheet:           history_sheets,             // โยงความสัมพันธ์กับ Entity HistorySheet
		EmergencyLevel:         emergency_levels,           // โยงความสัมพันธ์กับ Entity EmergencyLevel
		HighBloodPressureLevel: high_blood_pressure_levels, // โยงความสัมพันธ์กับ Entity HighBloodPressureLevel
		DiabetesLevel:          diabetes_levels,            // โยงความสัมพันธ์กับ Entity DiabetesLevel
		ObesityLevel:           obesity_levels,             // โยงความสัมพันธ์กับ Entity ObesityLevel
		Note:                   outpatient_screenings.Note,
	}

	// 17: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /outpatientscreenings
func ListOutpatientScreenings(c *gin.Context) {
	var outpatientScreenings []entity.OutpatientScreening
	// id := c.Param("id") //เก็บค่า id ที่ส่งมาจาก path ไว้ในตัวแปร id

	/*เงื่อนไขสำหรับการค้นหา โดยดึงข้อมูลจากตารางรองที่เกี่ยวข้องมา #ระวัง ชื่อ field ต้องตรงกัน
	ซึ่งดูฟิลด์ได้จากเราสร้างไว้ให้ entity หลัก ในไฟล์ schema */

	if err := entity.DB().Raw("SELECT * FROM outpatien_screenings").Preload("HistorySheet").Preload("EmergencyLevel").Preload("HighBloodPressureLevel").Preload("DiabetesLevel").Preload("ObesityLevel").
		Raw("SELECT * FROM outpatient_screenings").
		Find(&outpatientScreenings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": outpatientScreenings})

}

// GET /outpatientscreening/:id
func GetOutpatientScreening(c *gin.Context) {
	var outpatientScreening entity.OutpatientScreening //GET จะ​ get มาแค่ก้อนเดียวเลยไม่ใช้ array (เก็ทไอดีของตัวที่เคยบันทึก) [ex. เก็ทเอาไปคิดราคา(ของระบบอื่น)]

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM outpatient_screenings WHERE id = ?", id).
		Preload("HistorySheet").
		Preload("EmergencyLevel").
		Preload("HighBloodPressureLevel").
		Preload("DiabetesLevels").
		Preload("ObesityLevel").
		Find(&outpatientScreening).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": outpatientScreening})
}

// DELETE /outpatientscreenings/:id
func DeleteOutpatientScreening(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM outpatient_screenings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "outpatientscreening not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /outpatientscreenings
func UpdateOutpatientScreening(c *gin.Context) {
	var outpatientscreening entity.OutpatientScreening
	if err := c.ShouldBindJSON(&outpatientscreening); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", outpatientscreening.ID).First(&outpatientscreening); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "outpatientscreening not found"})
		return
	}

	if err := entity.DB().Save(&outpatientscreening).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": outpatientscreening})
}
