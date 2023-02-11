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
	Admin   	Admin	`gorm:"references:id" valid:"-"`
	EmployeeID	*uint
	Employee	Employee	`gorm:"references:id" valid:"-"`
	//RoomID ทำหน้าที่ FK
	RoomID 		*uint
	Room   		Room	`gorm:"references:id" valid:"-"`
	//StatusID ทำหน้าที่ FK
	StatusID  	*uint
	Status    	Status	`gorm:"references:id" valid:"-"`
	Date    	time.Time	`valid:"present~Date must be present"`
	StartTime	time.Time
	EndTime		time.Time
}

