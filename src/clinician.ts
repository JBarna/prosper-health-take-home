import { cloneWithoutTime, startOfWeekDate } from "./date-utils"
import { Appointment, AvailableAppointmentSlot, nonPresentableReasons } from "./types/appointment"
import { Clinician, ClinicianType } from "./types/clinician"
import { Patient } from "./types/patient"
import { clinicians } from "./data/mock-clinician"


export function applicableCliniciansForPatient(patient: Patient, clinicianType: ClinicianType) {
    return clinicians.filter(clinician => clinician.clinicianType === clinicianType 
        && clinician.states.includes(patient.state)
        && clinician.insurances.includes(patient.insurance))
}

export function checkLimitsForClinician(clinician: Clinician) {
    return (slot: AvailableAppointmentSlot) => {
        // check weekly limit
        const weekStart = startOfWeekDate(slot.date)
        if (appointmentsInWindow(weekStart, 7, clinician.appointments).length >= clinician.maxWeeklyAppointments) {
            slot.presentable = false
            slot.nonPresentableReason = nonPresentableReasons[0]
        }

        // check daily limit
        if (appointmentsInWindow(slot.date, 1, clinician.appointments).length >= clinician.maxDailyAppointments) {
            slot.presentable = false
            slot.nonPresentableReason = nonPresentableReasons[1]
        }
    }
}

function appointmentsInWindow(startDay: Date, dayWindow: 1 | 7, appointments: Appointment[]) {
    const baseDay = cloneWithoutTime(startDay)
    const endDay = cloneWithoutTime(startDay)
    endDay.setUTCDate(endDay.getUTCDate() + dayWindow)

    const appointmentsInWindow = appointments.filter(appt => appt.scheduledFor >= baseDay && appt.scheduledFor < endDay)
    return appointmentsInWindow
}