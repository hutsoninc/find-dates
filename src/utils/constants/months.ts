import { flattenArray } from '../flatten-array'

const months = {
    january: {
        variants: ['jan']
    },
    february: {
        variants: ['feb']
    },
    march: {
        variants: ['mar']
    },
    april: {
        variants: ['apr']
    },
    may: {
        variants: []
    },
    june: {
        variants: ['jun']
    },
    july: {
        variants: ['jul']
    },
    august: {
        variants: ['aug']
    },
    september: {
        variants: ['sep', 'sept']
    },
    october: {
        variants: ['oct']
    },
    november: {
        variants: ['nov']
    },
    december: {
        variants: ['dec']
    }
}

export const monthVariations = flattenArray(Object.keys(months).map(month => {
    return [month].concat(months[month].variants)
}))
