package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /subdistricts
func CreateSubDistrict(c *gin.Context) {
	var subdistrict entity.SubDistrict
	if err := c.ShouldBindJSON(&subdistrict); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subdistrict})
}

// GET /subdistrict/:id
func GetSubDistrict(c *gin.Context) {
	var subdistrict entity.SubDistrict
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM sub_districts WHERE id = ?", id).Scan(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subdistrict})
}

// GET /subdistricts
func ListSubDistricts(c *gin.Context) {
	var subdistricts []entity.SubDistrict
	if err := entity.DB().Raw("SELECT * FROM sub_districts").Scan(&subdistricts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subdistricts})
}

// DELETE /subdistricts/:id
func DeleteSubDistrict(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM sub_districts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subdistrict not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /subdistricts
func UpdateSubDistrict(c *gin.Context) {
	var subdistrict entity.SubDistrict
	if err := c.ShouldBindJSON(&subdistrict); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", subdistrict.ID).First(&subdistrict); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subdistrict not found"})
		return
	}
	if err := entity.DB().Save(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subdistrict})
}

// GET /subdistricts/districts/:id
func ListSubDistrictsByDistricts(c *gin.Context) {
	var subdistricts []entity.SubDistrict
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM sub_districts WHERE district_id = ?", id).Scan(&subdistricts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subdistricts})
}
