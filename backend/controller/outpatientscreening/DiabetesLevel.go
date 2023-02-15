package controller

import (
	"net/http"

	"github.com/sut65/team01/entity"
	//"github.com/ChatreeDev/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /DiabetesLevels
func CreateDiabetesLevel(c *gin.Context) {
	var diabetesLevel entity.DiabetesLevel
	if err := c.ShouldBindJSON(&diabetesLevel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&diabetesLevel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diabetesLevel})
}

// GET /DiabetesLevel/:id
func GetDiabetesLevel(c *gin.Context) {
	var diabetesLevel entity.DiabetesLevel

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM diabetes_levels WHERE id = ?", id).Find(&diabetesLevel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diabetesLevel})
}

// GET /DiabetesLevel
func ListDiabetesLevel(c *gin.Context) {
	var diabetesLevels []entity.DiabetesLevel //[] ส่งเป็นแบบลิสต์

	if err := entity.DB().Raw("SELECT * FROM diabetes_levels").Scan(&diabetesLevels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diabetesLevels})
}
