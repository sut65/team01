package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /districts
func CreateDistrict(c *gin.Context) {
	var district entity.District
	if err := c.ShouldBindJSON(&district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}

// GET /district/:id
func GetDistrict(c *gin.Context) {
	var district entity.District
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM districts WHERE id = ?", id).Scan(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}

// GET /districts
func ListDistricts(c *gin.Context) {
	var districts []entity.District
	if err := entity.DB().Raw("SELECT * FROM districts").Scan(&districts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": districts})
}

// DELETE /districts/:id
func DeleteDistrict(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM districts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /districts
func UpdateDistrict(c *gin.Context) {
	var district entity.District
	if err := c.ShouldBindJSON(&district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", district.ID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}
	if err := entity.DB().Save(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}

// GET /districts/provinces/:id
func ListDistrictsByProvinces(c *gin.Context) {
	var district []entity.District
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM districts WHERE province_id = ?", id).Scan(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}
