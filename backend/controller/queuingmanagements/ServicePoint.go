package controller

import (
	"net/http"

	"github.com/ChatreeDev/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /ServicePoints
func CreateServicePoint(c *gin.Context) {
	var servicePoint entity.ServicePoint
	if err := c.ShouldBindJSON(&servicePoint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&servicePoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": servicePoint})
}

// GET /ServicePoint/:id
func GetServicePoint(c *gin.Context) {
	var servicePoint entity.ServicePoint

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM service_points WHERE id = ?", id).Find(&servicePoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": servicePoint})
}

// GET /ServicePoint
func ListServicePoints(c *gin.Context) {
	var servicePoints []entity.ServicePoint //[] ส่งเป็นแบบลิสต์

	if err := entity.DB().Raw("SELECT * FROM service_points").Scan(&servicePoints).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": servicePoints})
}

// // DELETE /ObesityLevels/:id
// func DeleteObesityLevel(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM obesity_levels WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "obesity level not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /ObesityLevels
// func UpdateObesityLevel(c *gin.Context) {
// 	var ObesityLevel entity.ObesityLevel
// 	if err := c.ShouldBindJSON(&ObesityLevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", ObesityLevel.ID).First(&ObesityLevel); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "obesity level not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&ObesityLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": ObesityLevel})
// }

/* Note.
1. ObesityLevel เป็นตารางรอง ไม่จำเป็นต้องมี preload เพราะไม่ต้องไปดึงของใครมาใส่ของตัวเอง
2.
*/
