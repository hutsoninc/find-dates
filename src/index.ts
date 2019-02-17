import createTests from './create-tests';

export interface FindDatesOptions {
    delimiters?: string
}

export function findDates(input: string, options?: FindDatesOptions): object[] {

    options = Object.assign({
        delimiters: '-/'
    }, options);

    const tests: RegExp[] = createTests(options);

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

    // Sort matches by index
    match.sort((a, b) => {
        a = a.index;
        b = b.index;
        if (a < b) return -1;
        if (a > b) return 1;
        return;
    })

    return match;

}

function filterMatches(arr: { match: string, index: number }[]): { match: string, index: number }[] {

    let filtered = [];

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let matchIndex = filtered.findIndex(obj => obj.index === current.index);
        if (matchIndex >= 0) {
            if (filtered[matchIndex].match.length < current.match.length) {
                filtered[matchIndex] = current;
            }
            continue;
        }
        filtered.push(current);
    }

    return filtered;
}