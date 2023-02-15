package entity

import (
	"fmt"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Name     string
	Workload []Workload `gorm:"foreignKey:RoomID"`
}

type Status struct {
	gorm.Model
	Name     string
	Workload []Workload `gorm:"foreignKey:StatusID"`
}

type Workload struct {
	gorm.Model
	//AdminID ทำหน้าที่ FK
	AdminID    *uint
	Admin      Admin `gorm:"references:id" valid:"-"`
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`
	//RoomID ทำหน้าที่ FK
	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`
	//StatusID ทำหน้าที่ FK
	StatusID  *uint
	Status    Status    `gorm:"references:id" valid:"-"`
	Date      time.Time `valid:"present~Date must be present"`
	StartTime time.Time `valid:"future~Start Time must be future"`
	EndTime   time.Time `valid:"future~End Time must be future"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, o interface{}) bool {
        t := i.(time.Time)
        // ย้อนหลังไม่เกิน 1 วัน
        return t.After(time.Now())
    })
	govalidator.CustomTypeTagMap.Set("present", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Hour*-12)) && t.Before(time.Now().Add(time.Hour*12))
	})
	
}

func CheckTimeEnd(t time.Time, t2 time.Time) (bool, error) {
	if t.After(t2) {
		return true, nil
	} else {
		return false, fmt.Errorf("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด")
	}
}
