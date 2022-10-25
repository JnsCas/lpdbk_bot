const CronJob = require('cron').CronJob;

const THE_25_10_TUESDAY_AT_16_21    = '2022-10-25T16:21:00';
const THE_26_10_WEDNESDAY_AT_16_21  = '2022-10-26T16:21:00';
const THE_27_10_THURSDAY_AT_16_21   = '2022-10-27T16:21:00';
const THE_28_10_FRIDAY_AT_16_21     = '2022-10-28T16:21:00';
const THE_29_10_SATURDAY_AT_16_21   = '2022-10-29T16:21:00';
const THE_30_10_SUNDAY_AT_16_21     = '2022-10-30T16:21:00';
const THE_31_10_MONDAY_AT_16_21     = '2022-10-31T16:21:00';
const THE_1_11_TUESDAY_AT_16_21     = '2022-11-01T16:21:00';
const THE_2_11_WEDNESDAY_AT_16_21   = '2022-11-02T16:21:00';
const THE_3_11_THURSDAY_AT_16_21    = '2022-11-03T16:21:00';
const THE_4_11_FRIDAY_AT_16_21      = '2022-11-04T16:21:00';
const THE_5_11_SATURDAY_AT_16_21    = '2022-11-05T16:21:00';
const THE_6_11_SUNDAY_AT_16_21      = '2022-11-06T16:21:00';
const THE_7_11_MONDAY_AT_16_21      = '2022-11-07T16:21:00';
const THE_8_11_TUESDAY_AT_16_21     = '2022-11-08T16:21:00';
const THE_9_11     = '2022-11-09T16:21:00';
const THE_10_11     = '2022-11-10T16:21:00';
const THE_11_11     = '2022-11-11T16:21:00';
const THE_12_11     = '2022-11-12T16:21:00';
const THE_13_11     = '2022-11-13T16:21:00';
const THE_14_11     = '2022-11-14T16:21:00';
const THE_15_11     = '2022-11-15T16:21:00';
const THE_16_11     = '2022-11-16T16:21:00';
const THE_17_11     = '2022-11-17T16:21:00';
const THE_18_11     = '2022-11-18T16:21:00';
const THE_19_11     = '2022-11-19T16:21:00';
const THE_20_11     = '2022-11-20T16:21:00';
const THE_21_11     = '2022-11-21T16:21:00';
const THE_22_11     = '2022-11-22T16:21:00';
const THE_23_11     = '2022-11-23T16:21:00';
const THE_24_11     = '2022-11-24T16:21:00';
const THE_25_11     = '2022-11-25T16:21:00';
const THE_26_11     = '2022-11-26T16:21:00';
const THE_27_11     = '2022-11-27T16:21:00';
const THE_28_11     = '2022-11-28T16:21:00';
const THE_29_11     = '2022-11-29T16:21:00';
const THE_30_11     = '2022-11-30T16:21:00';
const THE_01_12     = '2022-12-01T16:21:00';
const THE_02_12     = '2022-12-02T16:21:00';
const THE_03_12     = '2022-12-03T16:21:00';
const THE_04_12     = '2022-12-04T16:21:00';
const THE_05_12     = '2022-12-05T16:21:00';
const THE_06_12     = '2022-12-06T16:21:00';
const THE_07_12     = '2022-12-07T16:21:00';
const THE_08_12     = '2022-12-08T16:21:00';

const cronDayLefts = [
  THE_25_10_TUESDAY_AT_16_21,
  THE_26_10_WEDNESDAY_AT_16_21,
  THE_27_10_THURSDAY_AT_16_21,
  THE_28_10_FRIDAY_AT_16_21,
  THE_29_10_SATURDAY_AT_16_21,
  THE_30_10_SUNDAY_AT_16_21,
  THE_31_10_MONDAY_AT_16_21,
  THE_1_11_TUESDAY_AT_16_21,
  THE_2_11_WEDNESDAY_AT_16_21,
  THE_3_11_THURSDAY_AT_16_21,
  THE_4_11_FRIDAY_AT_16_21,
  THE_5_11_SATURDAY_AT_16_21,
  THE_6_11_SUNDAY_AT_16_21,
  THE_7_11_MONDAY_AT_16_21,
  THE_8_11_TUESDAY_AT_16_21,
  THE_9_11,
  THE_10_11,
  THE_11_11,
  THE_12_11,
  THE_13_11,
  THE_14_11,
  THE_15_11,
  THE_16_11,
  THE_17_11,
  THE_18_11,
  THE_19_11,
  THE_20_11,
  THE_21_11,
  THE_22_11,
  THE_23_11,
  THE_24_11,
  THE_25_11,
  THE_26_11,
  THE_27_11,
  THE_28_11,
  THE_29_11,
  THE_30_11,
  THE_01_12,
  THE_02_12,
  THE_03_12,
  THE_04_12,
  THE_05_12,
  THE_06_12,
  THE_07_12,
  THE_08_12
]

const DAY_LEFTS = 44

module.exports = (bot) => {
  cronDayLefts.forEach((dateString, index) => {
    const job = new CronJob(new Date(dateString), function() {
      bot.telegram.sendPhoto(process.env.CHAT_ID, { source: `resources/images/tigre/${DAY_LEFTS - index}.jpeg` })
    }, null, true, 'America/Argentina/Buenos_Aires');
    job.start();
  })
}