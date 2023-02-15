package controller

import (
	"net/http"

	"github.com/sut65/team01/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func CreateWorkload(c *gin.Context) {
	var workload entity.Workload
	var employee entity.Employee
	var admin entity.Admin
	var room entity.Room
	var status entity.Status

	if err := c.ShouldBindJSON(&workload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", workload.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// 11: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", workload.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	// 12: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", workload.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// 13: ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", workload.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	// 14: สร้าง Workload
	WV := entity.Workload{
		Admin:     admin,              // โยงความสัมพันธ์กับ Entity Admin
		Employee:  employee,           // โยงความสัมพันธ์กับ Entity Employee
		Room:      room,               // โยงความสัมพันธ์กับ Entity Room
		Status:    status,             // โยงความสัมพันธ์กับ Entity Status
		Date:      workload.Date,      // ตั้งค่าฟิลด์ Date
		StartTime: workload.StartTime, // ตั้งค่าฟิลด์ StartTime
		EndTime:   workload.EndTime,   // ตั้งค่าฟิลด์ EndTime
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit test
	if _, err := govalidator.ValidateStruct(WV); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := entity.CheckTimeEnd(workload.EndTime, workload.StartTime); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&WV).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": WV})
}

// GET /workloads
func ListWorkload(c *gin.Context) {
	var workload []entity.Workload
	if err := entity.DB().Preload("Admin").Preload("Employee").Preload("Room").Preload("Status").Raw("SELECT * FROM workloads").Find(&workload).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workload})
}

// GET: /workload/:id
func GetWorkload(c *gin.Context) {
	var workload entity.Workload
	id := c.Param("id")
	if err := entity.DB().Preload("Admin").Preload("Employee").Preload("Room").Preload("Status").Raw("SELECT * FROM workloads WHERE id = ?", id).Find(&workload).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workload})
}

// DELETE /workloads/:id
func DeleteWorkload(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM workloads WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workload not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /workloads
func UpdateWorkload(c *gin.Context) {
	var workload entity.Workload
	if err := c.ShouldBindJSON(&workload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", workload.ID).First(&workload); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workload not found"})
		return
	}

	if err := entity.DB().Save(&workload).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workload})
}
