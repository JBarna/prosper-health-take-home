import { Patient, PatientIndex } from "../types/patient";
 
export const patients: Patient[] = [{
  id: "byrne",
  firstName: "Byrne",
  lastName: "Hollander",
  state: "NY",
  insurance: "AETNA"
}, {
  id: "joel",
  firstName: "Joel",
  lastName: "Barna",
  state: "NH",
  insurance: "UNITED"
}]

export const patientIndex = patients.reduce((acc: PatientIndex, patient) => (acc[patient.id] = patient) && acc, {})