const { DateTime } = require('luxon')

module.exports = {
  readableDate: dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).setLocale('en').toFormat('dd LLLL yyyy')
  },

  dateToISO: dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    })
  },

  htmlDateString: dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  },
}
