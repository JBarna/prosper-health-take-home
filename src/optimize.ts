import { AppointmentLength, AvailableAppointmentSlot, nonPresentableReasons } from "./types/appointment"
import { dateAfterDuration, sortSlots } from "./date-utils"

function eagerBookingsForGroup(slots: AvailableAppointmentSlot[], duration: AppointmentLength) {
    // always start with the first date, and see how far we can go
    const firstSlot = slots[0]
    const bookings = [firstSlot]

    let nextLeap = dateAfterDuration(firstSlot.date, duration)

    for (const slot of slots.slice(1)) {
        if (slot.date >= nextLeap) {
            bookings.push(slot)
            nextLeap = dateAfterDuration(slot.date, duration)
        }
    }

    return bookings
}

function createBookingGroups(slots: AvailableAppointmentSlot[], duration: AppointmentLength): AvailableAppointmentSlot[][] {
    // break up the dates into groups where each group has dates that 
    // overlap each other with the provided duration, and groups are separated
    // when there is a gap of time >= to the duration
    const groups: AvailableAppointmentSlot[][] = []

    let startIndex = 0

    slots.forEach(({date}, idx) => {
        const nextIndex = idx + 1
        const nextDate = slots[nextIndex]?.date && new Date(slots[nextIndex].date)
        const nextPossibleDate = dateAfterDuration(date, duration)
        
        // end of our sequence or end of the array
        if (!nextDate || (nextDate && nextDate >= nextPossibleDate)) { 
            groups.push(slots.slice(startIndex, nextIndex))

            // set our startIndex for the next group
            startIndex = nextIndex
        }
    })

    return groups
}

function optimalTimes (rawSlots: AvailableAppointmentSlot[], duration: AppointmentLength) {

    // sort dates, make new array instance as sort
    // changes location in existing array, and we don't
    // want to effect any reference outside of this function
    const slots = [...rawSlots.filter(slot => slot.presentable)]
    slots.sort(sortSlots);

    // all slots that were presentable are not until we've evaluated if they are optimal
    slots.forEach(slot => {
        slot.presentable = false
        slot.nonPresentableReason = nonPresentableReasons[2]
    })

    const groups = createBookingGroups(slots, duration)

    for (const group of groups) {
        // find the available booking dates for the first date
        const firstBookings = eagerBookingsForGroup(group, duration)
        const availableGroupTimes = [firstBookings]

        for (let i = 1; i < group.length; i++) {
            const newBookings = eagerBookingsForGroup(group.slice(i), duration)

            // we've reached a point where starting to book further into the available dates
            // actually reduces the # of total available bookings, so end here.
            if (newBookings.length < firstBookings.length) {
                break;
            }

            // we have the same # of available bookings, then this is still optimal,
            // so add these to the list of available group times
            availableGroupTimes.push(newBookings)
        }

        availableGroupTimes.flat().forEach((slot => {
            slot.presentable = true
            delete slot.nonPresentableReason
        }))
    }
}

export default optimalTimes