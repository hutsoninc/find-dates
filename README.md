# find-dates

[![Current npm package version](https://img.shields.io/npm/v/find-dates.svg)](https://www.npmjs.com/package/find-dates) [![Build Status](https://travis-ci.com/hutsoninc/find-dates.svg?branch=master)](https://travis-ci.com/hutsoninc/find-dates)

Find dates in a string where the format is unknown.

## Usage

`npm install find-dates`

```js
// JavaScript
const { extractDates } = require("find-dates");

extractDates("My birthday is on June 21st!");
// => ["June 21st"]

extractDates("We're closed on December 24th and December 25th.");
// => ["December 24th", "December 25th"]
```

## Todo

Work in progress. Here's a rough plan:

- [ ] Figure out default return value
    - Array of all matched strings
    - Array of dates interpreted from strings
        - How to handle date ranges with this?
    - Array of objects with match string and index of that match
- [x] Date as string (Ex: October 31st, 2018; Oct. 31, 2018; Oct 31 '18, Oct 31)
    - [x] Day numbers, 01-09, modifiers (st, nd, rd, th)
    - [x] Month variants
    - [x] Optional year
- [ ] Match standard local date formats (mm/dd/yyyy, mm-dd-yyyy, etc...)
- [ ] Date ranges (from x to y, x through y)
- [ ] Day of week
- [ ] Handle formats like:
    - [ ] May the 4th
    - [ ] 20th of November
    - [ ] May 12th-13th, May 12th and 13th, May 12th or 13th
- [ ] Accept options
    - [ ] Only return first
    - [ ] Specify which months to search for
    - [ ] Change returned format
- [ ] More tests
- [ ] Add linting

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)
