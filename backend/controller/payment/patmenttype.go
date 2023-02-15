package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// GET /:id
func GetPaymentType(c *gin.Context) {
	var paymenttype entity.PaymentType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payment_types WHERE id = ?", id).Scan(&paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
}

// GET
func ListPaymentTypes(c *gin.Context) {
	var paymenttypes []entity.PaymentType
	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&paymenttypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymenttypes})
}
