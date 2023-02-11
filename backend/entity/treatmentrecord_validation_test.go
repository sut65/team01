package entity

import (
	// "fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)



func TestTreatmentNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	treatment := TreatmentRecord{
		Note:              "",
		Treatment:        "", //wrong
		MedicineQuantity: 20,
		Date:             time.Now(),
	}

	// ตรวจสอบด้วย govalidation
	ok, err := govalidator.ValidateStruct(treatment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Treatment cannot be blank"))
}

func TestMedQuantNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	treatment := TreatmentRecord{
		Note:              "",
		Treatment:        "yes",
		MedicineQuantity: -56,
		Date:             time.Now(),
	}

	// ตรวจสอบด้วย govalidation
	ok, err := govalidator.ValidateStruct(treatment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("MedicineQuantity must not be negative"))

}

// func TestDateMustbeNotPast(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	n, _ := time.Parse("02 Jan 2006", "03 Feb 2022")
// 	treatment := TreatmentRecord{
// 		Note:              "",
// 		Treatment:        "yes",
// 		MedicineQuantity: 9,
// 		Date:             n,
// 	}

// 	// ตรวจสอบด้วย govalidation
// 	ok, err := govalidator.ValidateStruct(treatment)

// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error ต้องมี error message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("Recording time must be current"))
// }
