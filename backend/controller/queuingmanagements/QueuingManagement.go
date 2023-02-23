package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /queuingManagements
func CreateQueuingManagements(c *gin.Context) {

	var queuing_managements entity.QueuingManagement
	var history_sheets entity.HistorySheet
	var service_points entity.ServicePoint
	var service_channels entity.ServiceChannel
	var medical_actions entity.MedicalAction

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Queuingmanagement
	if err := c.ShouldBindJSON(&queuing_managements); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา HistorySheet ด้วย id
	if tx := entity.DB().Table("history_sheets").Where("id = ?", queuing_managements.HistorySheetID).First(&history_sheets); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "HistorySheet Registers not found"})
		return
	}

	// 11: ค้นหา Service Point ด้วย id
	if tx := entity.DB().Table("service_points").Where("id = ?", queuing_managements.ServicePointID).First(&service_points); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " Service Point not found"})
		return
	}

	// 12: ค้นหา service_channels ด้วย id
	if tx := entity.DB().Table("service_channels").Where("id = ?", queuing_managements.ServiceChannelID).First(&service_channels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service Channels type not found"})
		return
	}
	// 13: ค้นหา Medical Action ด้วย id
	if tx := entity.DB().Table("medical_actions").Where("id = ?", queuing_managements.MedicalActionID).First(&medical_actions); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Medical Actions type not found"})
		return
	}

	// 14: สร้าง QueuingManagement
	wv := entity.QueuingManagement{
		HistorySheet:   history_sheets,   // โยงความสัมพันธ์กับ Entity historySheets
		ServicePoint:   service_points,   // โยงความสัมพันธ์กับ Entity service_points
		ServiceChannel: service_channels, // โยงความสัมพันธ์กับ Entity service_channels
		MedicalAction:  medical_actions,  // โยงความสัมพันธ์กับ Entity medical_actions
	}

	// 15: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /queuingManagements/count
func GetCountQueuingManagements(c *gin.Context) {
	var Count int64

	if err := entity.DB().Raw("SELECT COUNT (*) FROM queuing_managements").
		Scan(&Count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Count})
}

// GET /queuingManagement
func ListQueuingManagements(c *gin.Context) {
	var queuingManagements []entity.QueuingManagement
	// id := c.Param("id") //เก็บค่า id ที่ส่งมาจาก path ไว้ในตัวแปร id

	/*เงื่อนไขสำหรับการค้นหา โดยดึงข้อมูลจากตารางรองที่เกี่ยวข้องมา #ระวัง ชื่อ field ต้องตรงกัน
	ซึ่งดูฟิลด์ได้จากเราสร้างไว้ให้ entity หลัก ในไฟล์ schema */

	if err := entity.DB().Raw("SELECT * FROM queuing_managements").Preload("HistorySheet").Preload("ServicePoint").Preload("ServiceChannel").Preload("MedicalAction").
		Raw("SELECT * FROM queuing_managements").
		Find(&queuingManagements).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": queuingManagements})

}

// GET /queuingManagement/:id
func GetQueuingManagement(c *gin.Context) {
	var queuingManagement entity.QueuingManagement //GET จะ​ get มาแค่ก้อนเดียวเลยไม่ใช้ array (เก็ทไอดีของตัวที่เคยบันทึก) [ex. เก็ทเอาไปคิดราคา(ของระบบอื่น)]

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM queuing_managements WHERE id = ?", id).
		Preload("history_sheets").
		Preload("service_points").
		Preload("service_channels").
		Preload("medical_actions").
		Find(&queuingManagement).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": queuingManagement})
}
