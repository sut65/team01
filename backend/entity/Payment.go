package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model

	PaymentTime time.Time `valid:"present~PaymentTime must be in the present"`
	Total       uint      `valid:"Total~Total cannot be zero"`

	PatientRightID *uint
	PatientRight   PatientRight `gorm:"references:ID"`

	PaymentTypeID *uint
	PaymentType   PaymentType `gorm:"references:ID"`

	CashierID *uint
	Cashier   Employee `gorm:"references:ID"`

	//MedicineRecordID ทำหน้าที่เป็น ForeignKey
	MedicineRecordID *uint
	MedicineRecord   MedicineRecord `gorm:"foreignKey: ID"`
}

type PaymentType struct {
	gorm.Model

	Type string

	Payments []Payment `gorm:"foreignKey:PaymentTypeID"`
}
