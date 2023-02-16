package controller

// import (
// 	"net/http"

// 	"github.com/sut65/team01/entity"
// 	//"github.com/ChatreeDev/sa-65-example/entity"
// 	"github.com/gin-gonic/gin"
// )

// /* Get คือดึงตาม id ที่ส่งไป(ส่งไปหรือส่งมาว้ะ 5555) ส่วน list คือดึงทั้งหมด*/

// // POST /emergencylevels
// func CreateEmergencyLevel(c *gin.Context) {
// 	var emergencyLevel entity.EmergencyLevel
// 	if err := c.ShouldBindJSON(&emergencyLevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&emergencyLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": emergencyLevel})
// }

// // GET /emergencylevel/:id
// func GetEmergencyLevel(c *gin.Context) {
// 	var emergencyLevel entity.EmergencyLevel

// 	//ใช้ Preload("Owner") หรอ?
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM emergency_levels WHERE id = ?", id).Find(&emergencyLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": emergencyLevel})
// }

// // GET /emergencylevels
// func ListEmergencyLevels(c *gin.Context) {
// 	var emergencyLevels []entity.EmergencyLevel

// 	if err := entity.DB().Raw("SELECT * FROM emergency_levels").Scan(&emergencyLevels).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": emergencyLevels})
// }

// // DELETE /emergencylevels/:id
// func DeleteEmergencyLevel(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM emergency_levels WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "emergencylevels not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /emergencylevels
// func UpdateEmergencyLevel(c *gin.Context) {
// 	var emergencylevel entity.EmergencyLevel
// 	if err := c.ShouldBindJSON(&emergencylevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", emergencylevel.ID).First(&emergencylevel); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "emergencylevel not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&emergencylevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": emergencylevel})
// }
