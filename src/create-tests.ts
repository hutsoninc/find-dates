import { dayVariations, monthVariations } from './utils/';
import { FindDatesOptions } from './';

export default function createTests(options: FindDatesOptions): RegExp[] {
    // Common expressions
    const expressions: { [key: string]: any } = {
        dayString: '((' + dayVariations.join('|') + ').?,?)',
        month: '(' + monthVariations.join('|') + ').?',
        year: '(' +
            // Include numbers 00-99 (with optional ' in front) and 0000-9999
            '(\\d{4}|\'?\\d{2})' +
            ')',
        monthNumbers: '([1][0-2]|[0]?[0-9])',
        dayNumbers: '([3][0-1]|[0-2]?[0-9])',
        yearNumbers: '(\\d{4}|\\d{2})'
    };

    expressions.day = '(' +
        // 01-31
        expressions.dayNumbers +
        // End of line, space after, comma after, or 'st', 'nd', 'rd', 'th' (doesn't include in match)
        '(?=($|\\s|,|(st|nd|rd|th)))' +
        ')' +
        // Include 'st', 'nd', 'rd', 'th' in match (optional)
        '(st|nd|rd|th)?';

    // Regex matchers to loop over against input
    let tests: string[] = [];

    tests.push(expressions.month + '\\s+(the\\s+)?' + expressions.day);

    tests.push(expressions.month + '\\s+' + expressions.day + ',?\\s+' + expressions.year);

    tests.push('\\b' + expressions.monthNumbers + '[' + options.delimiters + ']' + expressions.dayNumbers + '[' + options.delimiters + ']' + expressions.yearNumbers);

    tests.push(expressions.month + '\\s+(of\\s+)?' + expressions.year);

    tests.push('\\b' + expressions.day + '\\s+of\\s+' + expressions.month);

    return tests.map(str => new RegExp(str, 'gi'));
}