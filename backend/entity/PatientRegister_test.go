package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestBirthDayMustNotBeFuture(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	// dob := time.Now().Add(time.Hour * -24)
	p := "02 Jan 2006"
	dob, _ := time.Parse(p, "03 Feb 2056")
	t.Run("Check Date of Birth must not be the future", func(t *testing.T) {
		u := PatientRegister{
			FirstName:            "Teerasil",
			LastName:             "Daengda",
			IdentificationNumber: "1234567898123",
			Age:                  23,
			BirthDay:             dob,
			Mobile:               "0621539985",
			Occupation:           "Football Player",
			Address:              "BG Pathum United",
			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
		}
		ok, err := govalidator.ValidateStruct(u)
		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).ToNot(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Birth Day Invalids"))
	})
}
func TestAgeMustBeNotNegativeInteger(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	p := "02 Jan 2006"
	dob, _ := time.Parse(p, "03 Feb 2002")
	// loc, _ := time.LoadLocation("Asia/Bangkok")
	t.Run("Check Age must not be negative integer", func(t *testing.T) {
		u := PatientRegister{
			FirstName:            "Teerasil",
			LastName:             "Daengda",
			IdentificationNumber: "1234567890123",
			Age:                  -23,
			BirthDay:             dob,
			Mobile:               "0621539985",
			Occupation:           "Football Player",
			Address:              "BG Pathum United",
			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
		}
		ok, err := govalidator.ValidateStruct(u)
		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).ToNot(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Age Invalids"))
	})
}

func TestIdentificationMustNotBeBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	p := "02 Jan 2006"
	dob, _ := time.Parse(p, "03 Feb 2002")
	fmt.Println(dob)
	// loc, _ := time.LoadLocation("Asia/Bangkok")
	t.Run("Check identification must not be blank", func(t *testing.T) {
		u := PatientRegister{
			FirstName:            "Teerasil",
			LastName:             "Daengda",
			IdentificationNumber: "",
			Age:                  23,
			BirthDay:             dob,
			Mobile:               "0621539985",
			Occupation:           "Football Player",
			Address:              "BG Pathum United",
			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
		}
		ok, err := govalidator.ValidateStruct(u)
		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).ToNot(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("IdentificationNumber: non zero value required"))
	})
}
func TestCorrectPatientRegister(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	p := "02 Jan 2006"
	dob, _ := time.Parse(p, "03 Feb 2002")
	fmt.Println(dob)
	// loc, _ := time.LoadLocation("Asia/Bangkok")
	t.Run("Check Correct Data PatientRegister", func(t *testing.T) {
		u := PatientRegister{
			FirstName:            "Teerasil",
			LastName:             "Daengda",
			IdentificationNumber: "1234567890123",
			Age:                  23,
			BirthDay:             dob,
			Mobile:               "0621539985",
			Occupation:           "Football Player",
			Address:              "BG Pathum United",
			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
		}
		ok, err := govalidator.ValidateStruct(u)
		g.Expect(ok).To(gomega.BeTrue())
		g.Expect(err).To(gomega.BeNil())
		g.Expect(err)
	})
}
