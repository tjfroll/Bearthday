import React, { useState } from 'react'
import { DateTime } from 'luxon'
import PhotoFinder from './PhotoFinder'

// Return the most recent birthday given a birth date arbitrarily in the past
export const getLastBirthday = (birthDate: DateTime): DateTime => {
  const today = DateTime.local()
  const lastBirthday = DateTime.local().set({
    month: birthDate.get('month'),
    day: birthDate.get('day')
  })
  if (lastBirthday > today) {
    // NOTE: leap year birthdays will be off by 1 day
    return lastBirthday.minus({ year: 1 })
  }
  return lastBirthday
}

const BearthdayPhotoFinder = () => {
  const [inputDate, setInputDate] = useState<DateTime>()
  const [birthday, setBirthday] = useState<DateTime>()

  const submit = () => {
    setBirthday(getLastBirthday(inputDate))
  }

  return (
    <>
      <header>
        <h1>The Amazing Bearthday Photo Finder</h1>
      </header>
      <nav>
        <p>Enter your date of birth to see incredible photographs of Earth from your most recent birthday!</p>
        <input
          maxLength={10}
          onChange={({ target: { value } }) => value.length === 10 && setInputDate(DateTime.fromISO(value))}
          onKeyPress={({ key }) => inputDate?.isValid && key === 'Enter' && submit()}
          placeholder="YYYY-MM-DD"
          type="text"
        />
        <button
          disabled={!inputDate?.isValid}
          onClick={submit}
        >
          Submit
        </button>
      </nav>
      <main>
        {birthday?.isValid && <PhotoFinder targetDate={birthday} />}
      </main>
    </>
  )
}
export default BearthdayPhotoFinder