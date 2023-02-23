package controller

import (
	"net/http"

	"github.com/ChatreeDev/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /ServiceChannels
func CreateServiceChannel(c *gin.Context) {
	var serviceChannel entity.ServiceChannel
	if err := c.ShouldBindJSON(&serviceChannel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&serviceChannel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": serviceChannel})
}

// GET /ServiceChannel/:id
func GetServiceChannel(c *gin.Context) {
	var serviceChannel entity.ServiceChannel

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM service_channels WHERE id = ?", id).Find(&serviceChannel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": serviceChannel})
}

// GET /ServiceChannel
func ListServiceChannel(c *gin.Context) {
	var serviceChannels []entity.ServiceChannel //[] ส่งเป็นแบบลิสต์

	if err := entity.DB().Raw("SELECT * FROM service_channels").Scan(&serviceChannels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": serviceChannels})
}
