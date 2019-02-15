import { extractDates } from '../src';

describe('Should extract date from string', () => {

    let sets = [
        {
            in: 'Available on Friday, Nov. 16, 2018',
            out: ['Nov. 16, 2018']
        },
        {
            in: 'Open on December 25th',
            out: ['December 25th']
        },
        {
            in: 'Closed December 24th and December 25th',
            out: ['December 24th', 'December 25th']
        },
        {
            in: 'Here April 5 until 5:30',
            out: ['April 5']
        },
        {
            in: 'On apr 5',
            out: ['apr 5']
        },
        {
            in: "Born June 21st, '96",
            out: ["June 21st, '96"]
        },
        {
            in: "My birthday is on June 21st!",
            out: ["June 21st"]
        },
        {
            in: "April 21st without year April 21st, 2001 with year",
            out: ["April 21st", "April 21st, 2001"]
        },
        {
            in: "Feb 05 multiple Feb 05 times Feb 05",
            out: ["Feb 05", "Feb 05", "Feb 05"]
        },
        {
            in: "Oct 31 '18",
            out: ["Oct 31 '18"]
        },
    ];

    test('extract dates', () => {
        for (let i = 0; i < sets.length; i++) {
            expect(extractDates(sets[i].in)).toEqual(sets[i].out);
        }
    })

})