# find-dates

[![Current npm package version](https://img.shields.io/npm/v/find-dates.svg)](https://www.npmjs.com/package/find-dates) [![Build Status](https://travis-ci.com/hutsoninc/find-dates.svg?branch=master)](https://travis-ci.com/hutsoninc/find-dates)

Find dates in a string where the format is unknown.

## Usage

`npm install find-dates`

```js
const { findDates } = require("find-dates");

findDates("My birthday is on June 21st!");
// => [{ match: "June 21st", index: 18 ]

findDates("We're closed on December 24th and December 25th.");
// => [{ match: "December 24th", index: 16 }, { match: "December 25th", index: 34 }]
```

You may use this library in your Typescript project via:

```ts
import { findDates } from "find-dates";

findDates("My birthday is on June 21st!");
// => [{ match: "June 21st", index: 18 ]

findDates("We're closed on December 24th and December 25th.");
// => [{ match: "December 24th", index: 16 }, { match: "December 25th", index: 34 }]
```

### Options

#### delimiters

Delimiters to use when matching dates formatted as `MM/DD/YYYY` and `MM/DD/YY` where the delimiter is `/`. Some characters must be escaped for use in Regular Expressions. Setting this will override the default options, so if you want to match `-` and `/` make sure to include them.

Default: `-/`

## Todo

Work in progress. Here's a rough plan:

- [x] Figure out default return value
- [x] Date as string (Ex: October 31st, 2018; Oct. 31, 2018; Oct 31 '18, Oct 31)
    - [x] Day numbers, 01-09, modifiers (st, nd, rd, th)
    - [x] Month variants
    - [x] Optional year
- [ ] Match standard local date formats (mm/dd/yyyy, mm-dd-yyyy, etc...)
    - [x] MM/DD/YYYY and MM/DD/YY
- [ ] Date ranges (from x to y, x through y)
- [ ] Day of week
- [ ] Handle formats like:
    - [x] May the 4th
    - [x] 20th of November
    - [ ] May 12th-13th, May 12th and 13th, May 12th or 13th
        - [ ] Return as matched or as ['May 12th', 'May 13th']
    - [x] May of 2018
    - [x] May 2018
    - [x] May '18
- [ ] Accept options
    - [ ] Only return first
    - [ ] Specify which months to search for
    - [ ] Change returned format
    - [x] Custom delimiters on MM/DD/YYYY formats
- [ ] More tests
- [ ] Add linting
- [ ] Refactor

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)
