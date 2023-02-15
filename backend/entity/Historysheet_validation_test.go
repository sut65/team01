package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

//	func TestWeightMustMoreThanZeroFloat(t *testing.T) {
//		g := gomega.NewGomegaWithT(t)
//		p := "02 Jan 2006"
//		dob, _ := time.Parse(p, "03 Feb 2056")
//		fmt.Println(dob)
//		// loc, _ := time.LoadLocation("Asia/Bangkok")
//		t.Run("Check Weight must more than 0.00", func(t *testing.T) {
//			u := HistorySheet{
//				Weight: -0.05, // false data
//				Height: 169,
//				// BMI:                    22.00,
//				Temperature:            26.00,
//				SystolicBloodPressure:  60,
//				DiastolicBloodPressure: 60,
//				HeartRate:              45,
//				RespiratoryRate:        32,
//				OxygenSaturation:       40,
//				DrugAllergySymtom:      "None Symtom",
//				PatientSymtom:          "Goodness",
//				// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
//			}
//			ok, err := govalidator.ValidateStruct(u)
//			g.Expect(ok).NotTo(gomega.BeTrue())
//			g.Expect(err).ToNot(gomega.BeNil())
//			g.Expect(err.Error()).To(gomega.Equal("Weight Invalids"))
//		})
//	}
func TestHeartRateMustMoreThanZero(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	p := "02 Jan 2006"
	dob, _ := time.Parse(p, "03 Feb 2008")
	fmt.Println(dob)
	// loc, _ := time.LoadLocation("Asia/Bangkok")
	t.Run("Check Heart Rate must more than 0", func(t *testing.T) {
		u := HistorySheet{
			Weight: 33.00,
			Height: 169,
			// BMI:                    22.00,
			Temperature:            26.00,
			SystolicBloodPressure:  60,
			DiastolicBloodPressure: 60,
			HeartRate:              -5, // false data
			RespiratoryRate:        32,
			OxygenSaturation:       40,
			DrugAllergySymtom:      "None Symtom",
			PatientSymtom:          "Goodness",
			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
		}
		ok, err := govalidator.ValidateStruct(u)
		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).ToNot(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Heart Rate Invalids"))
	})
}

// func TestPatientSymtomMustNotBeBlank(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)
// 	p := "02 Jan 2006"
// 	dob, _ := time.Parse(p, "03 Feb 2008")
// 	fmt.Println(dob)
// 	// loc, _ := time.LoadLocation("Asia/Bangkok")
// 	t.Run("Check Symtom must not be blank", func(t *testing.T) {
// 		u := HistorySheet{
// 			Weight: 33.00,
// 			Height: 169,
// 			// BMI:                    22.00,
// 			Temperature:            26.00,
// 			SystolicBloodPressure:  60,
// 			DiastolicBloodPressure: 60,
// 			HeartRate:              45,
// 			RespiratoryRate:        32,
// 			OxygenSaturation:       40,
// 			DrugAllergySymtom:      "None Symtom",
// 			PatientSymtom:          "", // false data
// 			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
// 		}
// 		ok, err := govalidator.ValidateStruct(u)
// 		g.Expect(ok).NotTo(gomega.BeTrue())
// 		g.Expect(err).ToNot(gomega.BeNil())
// 		g.Expect(err.Error()).To(gomega.Equal("Symtom of Patient Invalids"))
// 	})
// }

// func TestCorrectHistorySheet(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)
// 	p := "02 Jan 2006"
// 	dob, _ := time.Parse(p, "03 Feb 2008")
// 	fmt.Println(dob)
// 	// loc, _ := time.LoadLocation("Asia/Bangkok")
// 	t.Run("Check Correct Data HistorySheet", func(t *testing.T) {
// 		u := HistorySheet{
// 			Weight: 33.00,
// 			Height: 169,
// 			// BMI:                    22.00,
// 			Temperature:            26.00,
// 			SystolicBloodPressure:  60,
// 			DiastolicBloodPressure: 60,
// 			HeartRate:              45,
// 			RespiratoryRate:        32,
// 			OxygenSaturation:       40,
// 			DrugAllergySymtom:      "None Symtom",
// 			PatientSymtom:          "Goodness",
// 			// BirthDay: time.Date(2020,06,14,00,00,00,00,loc),
// 		}
// 		ok, err := govalidator.ValidateStruct(u)
// 		g.Expect(ok).To(gomega.BeTrue())
// 		g.Expect(err).To(gomega.BeNil())
// 		g.Expect(err)
// 	})
// }
