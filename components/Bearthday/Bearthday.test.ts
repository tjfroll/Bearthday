import { DateTime } from 'luxon'
import { getLastBirthday } from './'
import { getImageUrl, getImageUrlsFromData, ImageData } from './PhotoViewer'

const TEST_FILENAME = 'TEST_FILENAME'
const TEST_IMAGE_DATA: ImageData[] = [{
  image: TEST_FILENAME
}]
const TEST_DATE = '2021/01/15'
const TEST_DATE_TIME = DateTime.fromISO('2021-01-15')
const EXPECTED_URL = 'https://epic.gsfc.nasa.gov/archive/enhanced/2021/01/15/jpg/TEST_FILENAME.jpg'

test('Valid urls are generated given a date and filename', () => {
  const url = getImageUrl(TEST_DATE, TEST_FILENAME)
  expect(url).toBe(EXPECTED_URL)
})

test('An array of urls are generated from image data', () => {
  const urls = getImageUrlsFromData(TEST_DATE_TIME, TEST_IMAGE_DATA)
  expect(urls.length).toBe(1)
  expect(urls[0]).toBe(EXPECTED_URL)
})

// TODO: more robust testing would account for the current year
test('The most recent birthday is correctly found', () => {
  const currentYear = DateTime.local().get('year')
  const previousYear = currentYear - 1

  const earlyBirthday = getLastBirthday(DateTime.fromISO('2000-01-01'))
  expect(earlyBirthday.toISODate()).toBe(`${currentYear}-01-01`)
  const lateBirthday = getLastBirthday(DateTime.fromISO('2000-12-31'))
  expect(lateBirthday.toISODate()).toBe(`${previousYear}-12-31`)
})