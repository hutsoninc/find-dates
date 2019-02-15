import { flattenArray } from '../flatten-array'

const days = {
    sunday: {
        variants: ['sun']
    },
    monday: {
        variants: ['mon']
    },
    tuesday: {
        variants: ['tues', 'tue', 'tu']
    },
    wednesday: {
        variants: ['wed']
    },
    thursday: {
        variants: ['thurs', 'thur', 'thu', 'th']
    },
    friday: {
        variants: ['fri']
    },
    saturday: {
        variants: ['sat']
    }
}

export const dayVariations = flattenArray(Object.keys(days).map(day => {
    return [day].concat(days[day].variants)
}))