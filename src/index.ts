import { monthVariations } from './utils/'

export function extractDates(input: string, options?: { regexModifiers: string }): string[] {

    options = Object.assign({
        regexModifiers: 'gi'
    }, options);

    // Common expressions
    let exp = {
        month: '(' + monthVariations.join('|') + ').?',
        day: '(' +
            // 01-31
            '[3][0-1]|[0-2]?[0-9]' +
            // End of line, space after, comma after, or 'st', 'nd', 'rd', 'th' (doesn't include in match)
            '(?=($|\\s|,|(st|nd|rd|th)))' +
            ')' +
            // Include 'st', 'nd', 'rd', 'th' in match (optional)
            '(st|nd|rd|th)?',
        year: '(' +
            // Include numbers 00-99 (with optional ' in front) and 0000-9999
            '(\\d{4}|\'?\\d{2})' +
            ')',
    }

    // Regex matchers to loop over against input
    let tests: any[] = [];

    tests.push(exp.month + '\\s+' + exp.day)

    tests.push(exp.month + '\\s+' + exp.day + ',?\\s+' + exp.year)

    tests = tests.map(str => new RegExp(str, options.regexModifiers))

    let match = [];

    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];

        let testMatch: any[] = [];
        let result;

        while ((result = test.exec(input))) {
            testMatch.push({
                match: result[0],
                index: result.index
            });
        }

        match = match.concat(testMatch);
    }

    // Loop over matches, remove less specific matches with same index
    match = filterMatches(match);

    // Get array of matched strings to return
    match = match.map(m => m.match);

    return match;

}

function filterMatches(arr, i?) {

    let initialLen = arr.length

    if (i === undefined) {
        i = arr.length
    }

    let current = arr[i - 1];

    for (let j = i - 2; j >= 0; j--) {
        // Check if in same location
        if (arr[j].index === current.index) {
            // Check which is shoter and remove
            if (arr[j].match.length >= current.match.length) {
                arr.length = i - 1
            } else {
                arr.splice(j, 1);
            }
            i = arr.length
            continue
        }
    }

    if (initialLen !== arr.length) {
        filterMatches(arr, i);
    }

    return arr;
}