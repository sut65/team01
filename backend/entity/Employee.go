package entity

import (
	"time"
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	FirstName string 
	LastName  string
	Email     string
	Password  string
	Employee []Employee `gorm:"foreignKey:AdminID"`
}

type Title struct {
	gorm.Model
	Name      string
	Employee []Employee `gorm:"foreignKey:TitleID"`
}

type Role struct {
	gorm.Model
	Name string
	Employee    []Employee `gorm:"foreignKey:RoleID"`
}

type Gender struct {
	gorm.Model
	Name      string
	Employee []Employee `gorm:"foreignKey:GenderID"`
}

type Employee struct {
	gorm.Model
	//AdminID ทำหน้าที่ FK
	AdminID *uint
	Admin   Admin
	IDCard  string `gorm:"uniqueIndex" valid:"required~Identification Number cannot be blank, matches(^[1-9]\\d{12}$)~IDCard does not validate"`
	//TitleID ทำหน้าที่ FK
	TitleID *uint
	Title   Title
	FirstName string `valid:"required~First Name cannot be blank"`
	LastName  string `valid:"required~Last Name cannot be blank"`
	//RoleID ทำหน้าที่ FK
	RoleID  *uint
	Role    Role
	PhoneNumber string `valid:"required~Phone Number cannot be blank, matches(^[0]{1}[689]{1}[0-9]{8})~Phone Number must be invalid"`
	Email       string `gorm:"uniqueIndex" valid:"required~Email cannot be blank, email~Email does not validate as email"`
	Password    string `valid:"required~Password cannot be blank"`
	//GenderID ทำหน้าที่ FK
	GenderID *uint
	Gender   Gender
	Salary 	float64	`valid:"required~Salary must not be zero,salary~Salary must not be negative"`
	Birthday    time.Time `valid:"past~Birthday: The following validator is invalid or can't be applied to the field: \"past\""`
}

