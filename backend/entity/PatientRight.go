package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Role struct {
	gorm.Model
	Position string
	Employee []Employee `gorm:"foreignKey:RoleID"`
}
type Employee struct {
	gorm.Model
	Name     string
	Email    string
	Password string

	//RoleID ทำหน้าที่เป็น ForeignKey
	RoleID *uint
	Role   Role `gorm:"references:id"`


	//1 Employee มีได้หลาย Bill
	Bills []Bill `gorm:"foreignKey:EmployeeID"`

	PatientRight []PatientRight `gorm:"foreignKey:EmployeeID"`
}

type Gender struct {
	gorm.Model
	Identity string
	Patient  []Patient `gorm:"foreignKey:GenderID"`
}

type PatientType struct {
	gorm.Model
	Typename string
	Patient  []Patient `gorm:"foreignKey:PatientTypeID"`
}


type Patient struct {
	gorm.Model
	HN        string    `valid:"matches(^HN\\d{6}$),required~HN cannot be blank"`
	Pid       string    `valid:"matches(^[1-9]\\d{12}$),required~Identification Number cannot be blank"`
	FirstName string    `valid:"required~FirstName cannot be blank"`
	LastName  string    `valid:"required~LastName cannot be blank"`
	Birthdate time.Time `valid:"past~Birthdate must be in the past"`
	Age       uint      `valid:"range(0|120)"`
	DateAdmit time.Time
	Symptom   string


	//GenderID ทำหน้าที่เป็น ForeignKey
	GenderID *uint
	Gender   Gender `gorm:"references:id" valid:"-"`

	//PatientTypeID ทำหน้าที่เป็น ForeignKey
	PatientTypeID *uint
	PatientType   PatientType `gorm:"references:id" valid:"-"`

	//PatientRightID ทำหน้าที่เป็น ForeignKey
	PatientRightID *uint
	PatientRight   PatientRight `gorm:"references:id" valid:"-"`
}

type RightType struct {
	gorm.Model
	Typename string
	Discount uint 
	PatientRight  []PatientRight `gorm:"foreignKey:RightTypeID"`
}

type  Hospital struct {
	gorm.Model
	Name string
	Local string
	PatientRight []PatientRight `gorm:"foreignKey:HospitalID"`
}

type PatientRight struct {
	gorm.Model
	Name string
	RightTypeID *uint
	RightType RightType `gorm:"references:id"`


	HospitalID *uint
	Hospital Hospital `gorm:"references:id" valid:"-"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id" valid:"-"`

	Note string 	  `valid:"required~Note cannot be blank"`
	
	DateRocrcord time.Time `valid:"Now~Time must be Now"`

	Patient []Patient `gorm:"foreignKey:PatientRightID"`
}


type Bill struct {
	gorm.Model

	PatientRightID *uint

	PatientRight PatientRight `gorm:"references:id" valid:"-"`

	BillTime time.Time `valid:"past~BillTime must be past"`

	Total uint `valid:"required~Total cannot be zero"`

	Telephone string `valid:"required~Telephone cannot be blank, matches(^[0]{1}[0-9]{9})~Telephone must be 10 digits"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

}



func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("Now", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(3 - time.Minute))
	})

	govalidator.CustomTypeTagMap.Set("positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) >= 0
	})
	govalidator.CustomTypeTagMap.Set("positivenum", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) > 0
	})

	
}
