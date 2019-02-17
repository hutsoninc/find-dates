import { findDates } from "../src";

describe("Should find dates in strings", () => {

    test("Month as string and day", () => {

        const set = [
            {
                in: "Open on December 25th",
                out: [{
                    match: "December 25th",
                    index: 8
                }]
            },
            {
                in: "Closed December 24th and December 25th",
                out: [{
                    match: "December 24th",
                    index: 7
                },
                {
                    match: "December 25th",
                    index: 25
                }]
            },
            {
                in: "Here April 5 until 5:30",
                out: [{
                    match: "April 5",
                    index: 5
                }]
            },
            {
                in: "On apr 5",
                out: [{
                    match: "apr 5",
                    index: 3
                }]
            },
            {
                in: "My birthday is on June 21st!",
                out: [{
                    match: "June 21st",
                    index: 18
                }]
            },
            {
                in: "May the 4th be with you",
                out: [{
                    match: "May the 4th",
                    index: 0
                }]
            },
            {
                in: "20th of April",
                out: [{
                    match: "20th of April",
                    index: 0
                }]
            },
            {
                in: "31st of Jan",
                out: [{
                    match: "31st of Jan",
                    index: 0
                }]
            },
        ];

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in)).toEqual(set[i].out);
        }
    });

    test("Month as string, day and year", () => {

        const set = [
            {
                in: "Born June 21st, '96",
                out: [{
                    match: "June 21st, '96",
                    index: 5
                }]
            },
            {
                in: "Apr. 20, '00",
                out: [{
                    match: "Apr. 20, '00",
                    index: 0
                }]
            },
            {
                in: "On Sep 20, '00 at midnight",
                out: [{
                    match: "Sep 20, '00",
                    index: 3
                }]
            },
            {
                in: "Oct 31 '18",
                out: [{
                    match: "Oct 31 '18",
                    index: 0
                }]
            },
        ];

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in)).toEqual(set[i].out);
        }
    });


    test("MM/DD/YY, MM/DD/YYYY, MM-DD-YY, and MM-DD-YYYY", () => {

        const set = [
            {
                in: "10/20/2018",
                out: [{
                    match: "10/20/2018",
                    index: 0
                }]
            },
            {
                in: "10/20/18",
                out: [{
                    match: "10/20/18",
                    index: 0
                }]
            },
            {
                in: "08/01/2000",
                out: [{
                    match: "08/01/2000",
                    index: 0
                }]
            },
            {
                in: "8/01/2000",
                out: [{
                    match: "8/01/2000",
                    index: 0
                }]
            },
            {
                in: "On 8/01/2000",
                out: [{
                    match: "8/01/2000",
                    index: 3
                }]
            },
            {
                in: "On 08/1/2000",
                out: [{
                    match: "08/1/2000",
                    index: 3
                }]
            },
            {
                in: "10-20-2018",
                out: [{
                    match: "10-20-2018",
                    index: 0
                }]
            },
            {
                in: "On 08-1-2000",
                out: [{
                    match: "08-1-2000",
                    index: 3
                }]
            },
        ];

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in)).toEqual(set[i].out);
        }
    });


    test("Month as string and year", () => {

        const set = [
            {
                in: "Jun. '19",
                out: [{
                    match: "Jun. '19",
                    index: 0
                }]
            },
            {
                in: "Aug 2001",
                out: [{
                    match: "Aug 2001",
                    index: 0
                }]
            },
            {
                in: "During August of 2001",
                out: [{
                    match: "August of 2001",
                    index: 7
                }]
            },
            {
                in: "In August, 2001",
                out: [{
                    match: "August, 2001",
                    index: 3
                }]
            },
        ]

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in)).toEqual(set[i].out);
        }
    });

    test("Multiple matches with varying formats", () => {

        const set = [
            {
                in: "April 21st, 2001 with year, April 21st without year",
                out: [{
                    match: "April 21st, 2001",
                    index: 0
                },
                {
                    match: "April 21st",
                    index: 28
                }]
            },
            {
                in: "April 21st without year April 21st, 2001 with year",
                out: [{
                    match: "April 21st",
                    index: 0
                },
                {
                    match: "April 21st, 2001",
                    index: 24
                }]
            },
            {
                in: "Feb 05 multiple Feb 05 times Feb 05.",
                out: [{
                    match: "Feb 05",
                    index: 0
                },
                {
                    match: "Feb 05",
                    index: 16
                },
                {
                    match: "Feb 05",
                    index: 29
                }]
            },
            {
                in: "01/01/01 is the same as January 01, 2001 or Jan. 1st, '01.",
                out: [{
                    match: "01/01/01",
                    index: 0
                },
                {
                    match: "January 01, 2001",
                    index: 24
                },
                {
                    match: "Jan. 1st, '01",
                    index: 44
                }]
            },
        ];

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in)).toEqual(set[i].out);
        }
    });

});

describe("Accepts options", () => {

    test("delimiters option", () => {

        const options = {
            delimiters: "\/.-"
        };

        const set = [{
            in: "10/20/18, 10-20-18, 10.20.18.",
            out: [{
                match: "10/20/18",
                index: 0
            },
            {
                match: "10-20-18",
                index: 10
            },
            {
                match: "10.20.18",
                index: 20
            }]
        }];

        for (let i = 0; i < set.length; i++) {
            expect(findDates(set[i].in, options)).toEqual(set[i].out);
        }

    });

});