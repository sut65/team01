package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMedicineRecord(t *testing.T) {
	g := NewGomegaWithT(t)

	//ข้อมูลที่ถูกต้องหมดทุก field
	medicinerecord := MedicineRecord{
		MedTime:    time.Now(),
		Advicetext: "ok",
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(medicinerecord)
	fmt.Printf("%v\n", err)
	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestAdvicetext(t *testing.T) {
	g := NewGomegaWithT(t)

	// field Advicetext ผิด
	medicinerecord := MedicineRecord{
		MedTime:    time.Now(),
		Advicetext: "", //ผิด
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(medicinerecord)
	fmt.Printf("%v\n", err)
	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Advicetext cannot be blank"))

}

// Not now
func TestMedTimeMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	medicinerecord := MedicineRecord{
		MedTime:    time.Date(2002, 1, 1, 12, 00, 00, 00, time.UTC), //ผิด
		Advicetext: "ok",
	}

	ok, err := govalidator.ValidateStruct(medicinerecord)
	fmt.Printf("%v\n", err)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("MedTime incorrect"))

}

// Not now
func TestMedTimeMustBeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	medicinerecord := MedicineRecord{
		MedTime:    time.Date(2027, 1, 1, 12, 00, 00, 00, time.UTC), //ผิด
		Advicetext: "ok",
	}

	ok, err := govalidator.ValidateStruct(medicinerecord)
	fmt.Printf("%v\n", err)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("MedTime incorrect"))

}
