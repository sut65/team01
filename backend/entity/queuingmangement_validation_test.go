package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบข้อมูลต้องถูกต้องหมดทุก field
func TestQueuingManagementCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	queuingmanagement := QueuingManagement{
		//ข้อมูลถามทั้งหมด
		Note:      "ซักประวัติเพิ่มเติม",
		Date:      time.Now(),
		TimeStart: time.Now().Add(1 * time.Hour),
		TimeEnd:   time.Now().Add(2 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(queuingmanagement)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To((BeNil()))

}

func TestNoteNotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	queuingmanagement := QueuingManagement{
		Note:      "",
		Date:      time.Now(),
		TimeStart: time.Now().Add(1 * time.Hour),
		TimeEnd:   time.Now().Add(2 * time.Hour),
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(queuingmanagement)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกการซักประวัติเพิ่มเติม"))
}

func TestDatesMustbePresent(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []time.Time{
		time.Now().Add(24 * time.Hour),
		time.Now().Add(-24 * time.Hour),
	}

	for _, fixture := range fixtures {
		queuingmanagement := QueuingManagement{
			Note:      "ซักประวัติเพิ่มเติม",
			Date:      fixture,
			TimeStart: time.Now().Add(1 * time.Hour),
			TimeEnd:   time.Now().Add(2 * time.Hour),
		}
		ok, err := govalidator.ValidateStruct(queuingmanagement)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Date must be present"))
	}
}

func TestTimeStartsMustbeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	queuingmanagement := QueuingManagement{
		Note:      "ซักประวัติเพิ่มเติม",
		Date:      time.Now(),
		TimeStart: time.Now().Add(-time.Hour),
		TimeEnd:   time.Now().Add(time.Hour),
	}

	ok, err := govalidator.ValidateStruct(queuingmanagement)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err.Error).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Start Time must be future"))
}

func TestTimeEndsMustbeFuture(t *testing.T) {

	g := NewGomegaWithT(t)

	queuingmanagement := QueuingManagement{
		Note:      "ซักประวัติเพิ่มเติม",
		Date:      time.Now(),
		TimeStart: time.Now().Add(time.Hour),
		TimeEnd:   time.Now().Add(-time.Hour),
	}

	ok, err := govalidator.ValidateStruct(queuingmanagement)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err.Error()).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("End Time must be future"))
}
