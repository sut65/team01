package entity

import (
	"fmt"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Medicine struct {
	gorm.Model

	Name        string
	Description string
	Price       int

	TreatmentRecord []TreatmentRecord `gorm:"foreignKey:MedicineID"`
}

type TreatmentRecord struct {
	gorm.Model

	//PatientID เป็น FK
	// PatientRegisterID *uint
	// PatientRegister   PatientRegister `gorm:"references:id" valid:"-"`

	//DoctorID เป็น FK
	DoctorID *uint
	Doctor   Employee `gorm:"references:id" valid:"-"`

	//DiagnosisRecord เป็น FK
	DiagnosisRecordID *uint
	DiagnosisRecord   DiagnosisRecord `gorm:"references:id" valid:"-"`

	Treatment   string `valid:"required~Treatment cannot be blank"`
	Note        string `valid:"-"`
	Appointment *bool  

	//MedicineID เป็น FK
	MedicineID       *uint
	Medicine         Medicine `gorm:"references:id" valid:"-"`
	MedicineQuantity int      `valid:"int, range(0|100)~MedicineQuantity must not be negative"`

	Date time.Time `valid:"present~Date must not be past"`
}

func init() {
	
	govalidator.CustomTypeTagMap.Set("present", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		// ปัจจุบัน บวกลบไม่เกิน 3 นาที		
		if t.Before(time.Now().Add(-3*time.Minute)) || t.After(time.Now().Add(3*time.Minute)) {
			return false
		} else {
			return true
		}
	})
}

func BooleanNotNull(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("Appointment cannot be Null")
	} else {
		return true, nil
	}
}
