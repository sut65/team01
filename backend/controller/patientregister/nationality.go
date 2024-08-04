package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /nationalities
func CreateNationality(c *gin.Context) {
	var nationality entity.Nationality
	if err := c.ShouldBindJSON(&nationality); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&nationality).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nationality})
}

// GET /nationality/:id
func GetNationality(c *gin.Context) {
	var nationality entity.Nationality
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM nationalities WHERE id = ?", id).Scan(&nationality).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nationality})
}

// GET /nationalities
func ListNationalities(c *gin.Context) {
	var nationalities []entity.Nationality
	if err := entity.DB().Raw("SELECT * FROM nationalities").Scan(&nationalities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nationalities})
}

// DELETE /nationalities/:id
func DeleteNationality(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM nationalities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /nationalities
func UpdateNationality(c *gin.Context) {
	var nationality entity.Nationality
	if err := c.ShouldBindJSON(&nationality); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", nationality.ID).First(&nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}
	if err := entity.DB().Save(&nationality).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nationality})
}
