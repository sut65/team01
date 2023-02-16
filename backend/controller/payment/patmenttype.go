package controller

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/sut65/team01/entity"
// )

// // POST /paymenttypes
// func CreatePaymentType(c *gin.Context) {
// 	var paymenttype entity.PaymentType
// 	if err := c.ShouldBindJSON(&paymenttype); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&paymenttype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
// }

// // GET /paymenttype/:id
// func GetPaymentType(c *gin.Context) {
// 	var paymenttype entity.PaymentType
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM payment_types WHERE id = ?", id).Scan(&paymenttype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
// }

// // GET /paymenttypes
// func ListPaymentTypes(c *gin.Context) {
// 	var paymenttypes []entity.PaymentType
// 	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&paymenttypes).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": paymenttypes})
// }

// // DELETE /paymenttypes/:id
// func DeletePaymentType(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM payment_types WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype level not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /paymenttypes
// func UpdatePaymentType(c *gin.Context) {
// 	var paymenttype entity.PaymentType
// 	if err := c.ShouldBindJSON(&paymenttype); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", paymenttype.ID).First(&paymenttype); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&paymenttype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
// }
