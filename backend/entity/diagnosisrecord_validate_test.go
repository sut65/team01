package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDiagnosisRecordPass(t *testing.T) {
	g := NewGomegaWithT(t)

	v := true
	diagnosis := DiagnosisRecord{

		Examination:        "yes",
		MedicalCertificate: &v,
		Date:               time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(diagnosis)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของ Examiantion แล้วต้องเจอ Error
func TestExaminationNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true

	diagnosis := DiagnosisRecord{

		Examination:        "", //wrong
		MedicalCertificate: &v,
		Date:               time.Now(),
	}

	// ตรวจสอบด้วย govalidation
	ok, err := govalidator.ValidateStruct(diagnosis)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Examination cannot be Blank"))

}

// ตรวจสอบวันที่ว่าไม่เป็นอนาคต หรืออดีต
func TestDateMustNotbePastandFuture(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true

	fixtures := []time.Time{
		time.Now().Add(24 * time.Hour),
		time.Now().Add(-24 * time.Hour),
	}

	for _, fixture := range fixtures {
		diagnosis := DiagnosisRecord{
			Examination:        "true",
			MedicalCertificate: &v,
			Date:               fixture, //wrong
		}

		// ตรวจสอบด้วย govalidation
		ok, err := govalidator.ValidateStruct(diagnosis)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Date must be present"))

	}

}

/////////////////////////////////////////////////////////////////////////

// ตรวจสอบว่า id ของ medical cetificate ไม่เป็น null (เป้น 0)
func TestMedicalCertificateNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	diagnosis := DiagnosisRecord{
		Examination:        "Headache",
		MedicalCertificate: nil,
		Date:               time.Now(),
	}

	// ตรวจสอบด้วย govalidation
	ok, err := CheckBool(diagnosis.MedicalCertificate)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าจ้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("MedicalCertificate cannot be Null"))
}
