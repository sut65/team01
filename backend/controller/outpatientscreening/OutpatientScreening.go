package controller

import (
	"net/http"

	"github.com/sut65/team01/entity"
	//"github.com/ChatreeDev/sa-65-example/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /outpatientScreenings
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
		TimeStart:              outpatient_screenings.TimeStart,
		TimeEnd:                outpatient_screenings.TimeEnd,
	}

	//ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(wv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 17: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /outpatientScreening
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

// DELETE /outpatientScreenings/:id
func DeleteOutpatientScreening(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM outpatient_screenings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Outpatient Screenings not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// GET /outpatientScreening/:id
func GetOutpatientScreening(c *gin.Context) {
	var outpatientScreening entity.OutpatientScreening //GET จะ​ get มาแค่ก้อนเดียวเลยไม่ใช้ array (เก็ทไอดีของตัวที่เคยบันทึก) [ex. เก็ทเอาไปคิดราคา(ของระบบอื่น)]

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM outpatient_screenings WHERE id = ?", id).
		Preload("HistorySheet").
		Preload("EmergencyLevel").
		Preload("HighBloodPressureLevel").
		Preload("DiabetesLevel").
		Preload("ObesityLevel").
		Find(&outpatientScreening).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": outpatientScreening})
}

// PATCH /outpatientScreenings
func UpdateOutpatientScreening(c *gin.Context) {
	var payload entity.OutpatientScreening
	var outpatient_screenings entity.OutpatientScreening
	var history_sheets entity.HistorySheet
	var emergency_levels entity.EmergencyLevel
	var high_blood_pressure_levels entity.HighBloodPressureLevel
	var diabetes_levels entity.DiabetesLevel
	var obesity_levels entity.ObesityLevel

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ID).First(&outpatient_screenings); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"outpatient_screenings error": " not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.HistorySheetID).First(&history_sheets); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HistorySheet not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.EmergencyLevelID).First(&emergency_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EmergencyLevel not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.HighBloodPressureLevelID).First(&high_blood_pressure_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HighBloodPressureLevel not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.DiabetesLevelID).First(&diabetes_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HighBloodPressureLevel not found"})
		return
	}
	//
	if tx := entity.DB().Where("id = ?", payload.ObesityLevelID).First(&obesity_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HighBloodPressureLevel not found"})
		return
	}
	updateoutpatientscreening := entity.OutpatientScreening{
		Note:                   payload.Note,
		TimeStart:              payload.TimeStart,
		TimeEnd:                payload.TimeEnd,
		HistorySheet:           history_sheets,
		EmergencyLevel:         emergency_levels,
		HighBloodPressureLevel: high_blood_pressure_levels,
		DiabetesLevel:          diabetes_levels,
		ObesityLevel:           obesity_levels,
	}

	if _, err := govalidator.ValidateStruct(updateoutpatientscreening); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", outpatient_screenings.ID).Updates(&updateoutpatientscreening).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Save(&outpatient_screenings).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": outpatient_screenings})
}
