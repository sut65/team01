package controller

import (
	"net/http"
	"github.com/sut65/team01/entity"
	"github.com/gin-gonic/gin"
)

func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var admin entity.Admin
	var title entity.Title
	var role entity.Role
	var gender entity.Gender

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", employee.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// 11: ค้นหา title ด้วย id
	if tx := entity.DB().Where("id = ?", employee.TitleID).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room type not found"})
		return
	}

	// 12: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "building type not found"})
		return
	}

	// 13: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service day not found"})
		return
	}

	// 14: สร้าง Employee
	WV := entity.Employee{
		IDCard:     employee.IDCard, // ตั้งค่าฟิลด์ IDCard 
		Title:   title,    // โยงความสัมพันธ์กับ Entity Title
		Name:     employee.Name,   // ตั้งค่าฟิลด์ Name
		Role:   role,    // โยงความสัมพันธ์กับ Entity Position
		Phonenumber:       employee.Phonenumber,   // ตั้งค่าฟิลด์ Phonenumber
		Email: employee.Email,  /// ตั้งค่าฟิลด์ Email
		Password: employee.Password,  // ตั้งค่าฟิลด์ Password
		Gender:     gender,      // โยงความสัมพันธ์กับ Entity Gender
		Salary:	employee.Salary, // ตั้งค่าฟิลด์ Salary
		BirthDay: employee.BirthDay, // ตั้งค่าฟิลด์ BirthDay
	}

	// 15: บันทึก
	if err := entity.DB().Create(&WV).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": WV})
}

// GET /employees
func ListEmployees(c *gin.Context) {
	var employee []entity.Employee
	if err := entity.DB().Table("employees").Preload("Admin").Preload("Title").Preload("Position").Preload("Gender").Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET: /employee/:id
func GetEmployee(c *gin.Context) {
	id := c.Param("id")
	var employee entity.Employee
	if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).Preload("Admin").Preload("Title").Preload("Position").Preload("Gender").Find(employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		   c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employees
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}

	if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
		   c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		   return
	}

	if err := entity.DB().Save(&employee).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}