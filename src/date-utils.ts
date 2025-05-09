import { AppointmentLength, AvailableAppointmentSlot } from "./types/appointment";

export function dateAfterDuration(date: Date, duration: AppointmentLength): Date {
    const newDate = new Date(date)
    newDate.setUTCMinutes(duration + newDate.getUTCMinutes())
    return newDate
}

export const sortSlots = (s1: AvailableAppointmentSlot, s2: AvailableAppointmentSlot): number => s1.date < s2.date ? -1 : 1

export function cloneWithoutTime(date: Date) {
    const newDate = new Date(date)
    newDate.setUTCHours(0)
    newDate.setUTCMinutes(0)
    newDate.setUTCSeconds(0)
    newDate.setUTCMilliseconds(0)
    
    return newDate
}

export function startOfWeekDate(date: Date): Date {
    const newDate = cloneWithoutTime(date)
    newDate.setUTCDate(newDate.getUTCDate() - newDate.getUTCDay())
    return newDate
}