package controller

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/sut65/team01/entity"
// )

// // /*	POST /users
// // 	func CreateUser(c *gin.Context) {
// // 		var user entity.User
// // 		if err := c.ShouldBindJSON(&user); err != nil {
// // 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 			return
// // 		}
// // 		if err := entity.DB().Create(&user).Error; err != nil {
// // 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 			return
// // 		}
// // 		c.JSON(http.StatusOK, gin.H{"data": user})
// // 	}
// // */

// // POST /drugallergies
// func CreateDrugAllergy(c *gin.Context) {
// 	var drugallergy entity.DrugAllergy
// 	if err := c.ShouldBindJSON(&drugallergy); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if err := entity.DB().Create(&drugallergy).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": drugallergy})
// }

// // *******************************************************************************************************

// // GET /user/:id
// // func GetUser(c *gin.Context) {
// // 	var user entity.User
// // 	id := c.Param("id")
// // 	if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", id).Scan(&user).Error; err != nil {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		   return
// // 	}
// // 	c.JSON(http.StatusOK, gin.H{"data": user})
// // }

// // GET /drugallergy/:id
// func GetDrugAllergy(c *gin.Context) {
// 	var drugallergy entity.DrugAllergy
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM drug_allergies WHERE id = ?", id).Scan(&drugallergy).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": drugallergy})
// }

// // *******************************************************************************************************

// // GET /users
// // func ListUsers(c *gin.Context) {
// // 	var users []entity.User
// // 	if err := entity.DB().Raw("SELECT * FROM users").Scan(&users).Error; err != nil {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		   return
// // 	}
// // 	c.JSON(http.StatusOK, gin.H{"data": users})
// // }

// // GET /drugallergies
// func ListDrugAllergies(c *gin.Context) {
// 	var drugallergies []entity.DrugAllergy
// 	if err := entity.DB().Raw("SELECT * FROM drug_allergies").Scan(&drugallergies).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": drugallergies})
// }

// // *******************************************************************************************************

// // DELETE /users/:id
// // func DeleteUser(c *gin.Context) {
// // 	id := c.Param("id")
// // 	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// // 		   return
// // 	}
// // 	c.JSON(http.StatusOK, gin.H{"data": id})
// // }

// // DELETE /drugallergies/:id
// func DeleteDrugAllergy(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM drug_allergies WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "drugallergy not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // *******************************************************************************************************

// // PATCH /users
// // func UpdateUser(c *gin.Context) {
// // 	var user entity.User
// // 	if err := c.ShouldBindJSON(&user); err != nil {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		   return
// // 	}
// // 	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// // 		   return
// // 	}
// // 	if err := entity.DB().Save(&user).Error; err != nil {
// // 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		   return
// // 	}
// // 	c.JSON(http.StatusOK, gin.H{"data": user})
// // }

// // PATCH /drugallergies
// func UpdateDrugAllergy(c *gin.Context) {
// 	var drugallergy entity.DrugAllergy
// 	if err := c.ShouldBindJSON(&drugallergy); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if tx := entity.DB().Where("id = ?", drugallergy.ID).First(&drugallergy); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "drugallergy not found"})
// 		return
// 	}
// 	if err := entity.DB().Save(&drugallergy).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": drugallergy})
// }
