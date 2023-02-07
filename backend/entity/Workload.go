package entity

import (
	"time"
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Name      string
	Workload []Workload `gorm:"foreignKey:RoomID"`
}

type Status struct {
	gorm.Model
	Name string
	Workload    []Workload `gorm:"foreignKey:StatusID"`
}

type Workload struct {
	gorm.Model
	//AdminID ทำหน้าที่ FK
	AdminID 	*uint
	Admin   	Admin
	EmployeeID	*uint
	Employee	Employee
	//RoomID ทำหน้าที่ FK
	RoomID 		*uint
	Room   		Room
	//StatusID ทำหน้าที่ FK
	StatusID  	*uint
	Status    	Status
	Date    	time.Time
	TimeStart	time.Time
	TimeEnd		time.Time
}

