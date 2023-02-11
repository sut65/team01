package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type MedicineRecord struct {
	gorm.Model

	MedTime    time.Time `valid:"present~MedTime must be in the present"`
	Advicetext string    `valid:"required~Advicetext cannot be blank"`
	// EmployeeID ทำหน้าที่เป็น FK
	PharmacistID *uint
	Pharmacist   Employee `gorm:"references:id" valid:"-"`

	//TreatmentRecordID ทำหน้าที่เป็น ForeignKey
	TreatmentRecordID *uint
	TreatmentRecord   TreatmentRecord `gorm:"references:id" valid:"-"`

	//statusMedID ทำหน้าที่เป็น ForeignKey
	StatusMedID *uint
	StatusMed   StatusMed `gorm:"references:id" valid:"-"`
	Payments    []Payment `gorm:"foreignKey:MedicineRecordID"`
}
type StatusMed struct {
	gorm.Model
	Number uint
	Status string `valid:"matches(^[1-9]\\d{7}$),required"`

	// 1 statusMed มีได้หลาย MedicineRecord
	MedicineRecords []MedicineRecord `gorm:"foreignKey: StatusMedID"`
}

func init() {

	govalidator.CustomTypeTagMap.Set("Total", func(i interface{}, context interface{}) bool {
		return govalidator.InRangeInt(int(i.(uint)), 1, 9999)
	})

	govalidator.CustomTypeTagMap.Set("customPositiveNumber", func(i interface{}, context interface{}) bool {
		return i.(float64) >= 0
	})

	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("present", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ปัจจุบัน บวกลบไม่เกิน 12 ชั่วโมง
		return t.After(time.Now().Add(time.Hour*-5)) && t.Before(time.Now().Add(time.Hour*5))
	})
	// govalidator.CustomTypeTagMap.Set("Now", func(i interface{}, context interface{}) bool {
	// 	t := i.(time.Time)
	// 	return t.Equal(time.Now())
	// })
}
