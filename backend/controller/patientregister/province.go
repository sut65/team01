package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /provinces
func CreateProvince(c *gin.Context) {
	var province entity.Province
	if err := c.ShouldBindJSON(&province); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /province/:id
func GetProvince(c *gin.Context) {
	var province entity.Province
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM provinces WHERE id = ?", id).Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /provinces
func ListProvinces(c *gin.Context) {
	var provinces []entity.Province
	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&provinces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": provinces})
}

// DELETE /provinces/:id
func DeleteProvince(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM provinces WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /provinces
func UpdateProvince(c *gin.Context) {
	var province entity.Province
	if err := c.ShouldBindJSON(&province); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", province.ID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}
	if err := entity.DB().Save(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}
