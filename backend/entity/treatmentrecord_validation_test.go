package entity

import (
	// "fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTreatmentRecordPass(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true

	//ข้อมูลต้องถูกทุก field
	treatment := TreatmentRecord{
		Note:        "yes",
		Treatment:   "yes",
		Appointment: &v,
		Date:        time.Now(),
	}
	order := []MedicineOrder{
		{OrderAmount: 5},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())

	for _, item := range order {
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(item)

		// ok ต้องเป็น true แปลว่าไม่มี error
		g.Expect(ok).To(BeTrue())

		// err เป็นค่า nil แปลว่าไม่มี error
		g.Expect(err).To(BeNil())
	}

}

func TestTreatmentNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true

	treatment := TreatmentRecord{
		Note:        "",
		Treatment:   "", //wrong
		Appointment: &v,
		Date:        time.Now(),
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

func TestAmountNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	order := MedicineOrder{
		OrderAmount: -1, //wrong
	}

	// ตรวจสอบด้วย govalidation
	ok, err := govalidator.ValidateStruct(order)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Order Amount must not be negative"))

}

// ตรวจสอบวันที่ว่าไม่เป็นอนาคต หรืออดีต
func TestDateCanNotbePastandFuture(t *testing.T) {
	g := NewGomegaWithT(t)
	v := false

	fixtures := []time.Time{
		time.Now().Add(24 * time.Hour),
		time.Now().Add(-24 * time.Hour),
	}

	for _, fixture := range fixtures {
		treatment := TreatmentRecord{
			Note:        "",
			Treatment:   "yes",
			Appointment: &v,
			Date:        fixture, //wrong
		}

		// ตรวจสอบด้วย govalidation
		ok, err := govalidator.ValidateStruct(treatment)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Date must be present"))

	}
}

/////////////////////////////////////////////////////////////////////////

// ตรวจสอบว่า id ของ medical cetificate ไม่เป็น null (เป้น 0)
func TestAppointmentNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	treatment := TreatmentRecord{
		Note:        "",
		Treatment:   "ให้ยา", //wrong
		Appointment: nil,
		Date:        time.Now(),
	}

	// ตรวจสอบด้วย govalidation
	ok, err := BooleanNotNull(treatment.Appointment)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Appointment cannot be Null"))
}
