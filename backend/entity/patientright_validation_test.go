package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPatientRightPass(t *testing.T) {
	g := NewGomegaWithT(t)

	patientright := PatientRight{
		Note:       "wanted",
		DateRecord: time.Now(),
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(patientright)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestPatientRightNote(t *testing.T) {
	g := NewGomegaWithT(t)

	patientright := PatientRight{
		Note:       "", //ผิดต้องไม่เป็นข้อมูล
		DateRecord: time.Now(),
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(patientright)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note cannot be blank"))
}

func TestPatientRightTime(t *testing.T) {
	g := NewGomegaWithT(t)

	patientright := PatientRight{
		Note:       "wanted",
		DateRecord: time.Date(2024, 1, 1, 12, 00, 00, 00, time.UTC),
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(patientright)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Time must be Now"))
}
