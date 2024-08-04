package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /bloodtypes
func CreateBloodType(c *gin.Context) {
	var bloodtype entity.BloodType
	if err := c.ShouldBindJSON(&bloodtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&bloodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bloodtype})
}

// GET /bloodtype/:id
func GetBloodType(c *gin.Context) {
	var bloodtype entity.BloodType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM blood_types WHERE id = ?", id).Scan(&bloodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bloodtype})
}

// GET /bloodtypes
func ListBloodTypes(c *gin.Context) {
	var bloodtypes []entity.BloodType
	if err := entity.DB().Raw("SELECT * FROM blood_types").Scan(&bloodtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bloodtypes})
}

// DELETE /bloodtypes/:id
func DeleteBloodType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM blood_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bloodtype not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bloodtypes
func UpdateBloodType(c *gin.Context) {
	var bloodtype entity.BloodType
	if err := c.ShouldBindJSON(&bloodtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", bloodtype.ID).First(&bloodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bloodtype not found"})
		return
	}
	if err := entity.DB().Save(&bloodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bloodtype})
}
