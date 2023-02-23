package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /MedicalActions
func CreateMedicalAction(c *gin.Context) {
	var medicalAction entity.MedicalAction
	if err := c.ShouldBindJSON(&medicalAction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&medicalAction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicalAction})
}

// GET /MedicalAction/:id
func GetMedicaAction(c *gin.Context) {
	var medicalAction entity.MedicalAction

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM medical_actions WHERE id = ?", id).Find(&medicalAction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicalAction})
}

// GET /MedicalAction
func ListMedicalAction(c *gin.Context) {
	var medicalActions []entity.MedicalAction //[] ส่งเป็นแบบลิสต์

	if err := entity.DB().Raw("SELECT * FROM medical_actions").Scan(&medicalActions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicalActions})
}
