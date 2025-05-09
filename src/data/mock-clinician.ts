import { Clinician, ClinicianIndex } from "../types/clinician";

export const clinicians: Clinician[] = [{
  id: "jane",
  firstName: "Jane",
  lastName: "Doe",
  states: ["NY", "CA"],
  insurances: ["AETNA", "CIGNA"],
  clinicianType: "PSYCHOLOGIST",
  appointments: [{
    scheduledFor: new Date("2024-08-28T15:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-28T18:00:00.000Z")
  }],
  availableSlots: [],
  maxDailyAppointments: 2,
  maxWeeklyAppointments: 8,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: "john",
  firstName: "John",
  lastName: "Doe",
  states: ["NY", "NH"],
  insurances: ["AETNA", "UNITED"],
  clinicianType: "PSYCHOLOGIST",
  appointments: [{
    scheduledFor: new Date("2024-08-26T15:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-26T18:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-27T15:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-27T18:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-28T15:00:00.000Z")
  },
  {
    scheduledFor: new Date("2024-08-28T18:00:00.000Z")
  }],
  availableSlots: [],
  maxDailyAppointments: 3,
  maxWeeklyAppointments: 6,
  createdAt: new Date(),
  updatedAt: new Date(),
}]

export const clinicianIndex = clinicians.reduce((acc: ClinicianIndex, patient) => (acc[patient.id] = patient) && acc, {})