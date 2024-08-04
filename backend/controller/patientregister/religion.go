package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /religions
func CreateReligion(c *gin.Context) {
	var religion entity.Religion
	if err := c.ShouldBindJSON(&religion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religion})
}

// GET /religion/:id
func GetReligion(c *gin.Context) {
	var religion entity.Religion
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM religions WHERE id = ?", id).Scan(&religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religion})
}

// GET /religions
func ListReligions(c *gin.Context) {
	var religions []entity.Religion
	if err := entity.DB().Raw("SELECT * FROM religions").Scan(&religions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religions})
}

// DELETE /religions/:id
func DeleteReligion(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM religions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /religions
func UpdateReligion(c *gin.Context) {
	var religion entity.Religion
	if err := c.ShouldBindJSON(&religion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", religion.ID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}
	if err := entity.DB().Save(&religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religion})
}
