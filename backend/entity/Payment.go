package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model

	PatientRightID *uint

	PatientRight PatientRight `gorm:"references:id" valid:"-"`

	PaymentTypeID *uint

	PaymentType PaymentType `gorm:"references:id" valid:"-"`

	PaymentTime time.Time

	Total uint `valid:"required~Total cannot be zero"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	//MedicineRecordID ทำหน้าที่เป็น ForeignKey
	MedicineRecordID *uint
	MedicineRecord   MedicineRecord `gorm:"references:id" valid:"-"`
}

type PaymentType struct {
	gorm.Model

	Type string

	Payments []Payment `gorm:"foreignKey:PayTypeID"`
}
