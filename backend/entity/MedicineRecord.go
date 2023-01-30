package entity

import (
	"time"

	"gorm.io/gorm"
)

type MedicineRecord struct {
	gorm.Model

	MedTime    time.Time `valid:"future~MedTime must be in the future"`
	Advicetext string
	// EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	//TreatmentRecordID ทำหน้าที่เป็น ForeignKey
	TreatmentRecordID *uint
	TreatmentRecord   TreatmentRecord `gorm:"references:id" valid:"-"`

	//statusMedID ทำหน้าที่เป็น ForeignKey
	statusMedID *uint
	statusMed   statusMed `gorm:"references:id" valid:"-"`
}
type statusMed struct {
	gorm.Model
	Number *uint
	Status string `valid:"matches(^[1-9]\\d{7}$),required"`

	// 1 statusMed มีได้หลาย MedicineRecord
	MedicineRecords []MedicineRecord `gorm:"foreignKey: MedicineRecordID"`
}
