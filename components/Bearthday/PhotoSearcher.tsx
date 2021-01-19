import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { PhotoViewer, ImageData } from './PhotoViewer'

interface Props {
  targetDate: DateTime
}

const BASE_METADATA_URL = 'https://epic.gsfc.nasa.gov/api/enhanced/date'

// Searches for images as close to the target date as possible
// Returns the date used and a list of urls pointing to images for that date
const getClosestImagesForDate = async (targetDate: DateTime): Promise<{
  date: DateTime,
  imageData: ImageData[]
}> => {
  let date = targetDate
  let foundImages = false

  while (!foundImages) {
    const url = `${BASE_METADATA_URL}/${date.toISODate()}`

    try {
      const res = await fetch(url)
      const imageData: ImageData[] = await res.json()
      if (imageData && imageData.length) {
        return {
          date,
          imageData
        }
      }
    } catch (error) {
      // TODO: inform user of error
      return {
        date,
        imageData: []
      }
    }

    // Stop searching if target date is tomorrow
    if (date.plus({ days: 1 }) > DateTime.local()) {
      return {
        date,
        imageData: []
      }
    }

    // Check the next calendar date
    date = date.plus({ days: 1 })
  }
}

export const PhotoSearcher = ({ targetDate }: Props) => {
  const [loading, setLoading] = useState(true) 
  const [imageData, setImageData] = useState<ImageData[]>([])
  const [foundDate, setFoundDate] = useState<DateTime>()

  const fetchImageData = async () => {
    setLoading(true)
    const { date, imageData } = await getClosestImagesForDate(targetDate)
    setFoundDate(date)
    setImageData(imageData)
    setLoading(false)
  }

  useEffect(() => {
    // This is also checked upstream, but we really don't want to hit NASA with any unnecessary requests!
    if (targetDate.isValid) {
      fetchImageData()
    }
  }, [targetDate])

  if (!targetDate.isValid) {
    return null
  }

  if (loading) {
    return <p>Please wait while we search for your bearthday photos...</p>
  }

  // For very recent birthdays, there are often no available photos
  if (!imageData.length) {
    return <p>Sorry! We couldn't find any recent bearthday photos for {targetDate.toISODate()}.</p>
  }

  const foundTargetDate = foundDate && (targetDate.toISODate() === foundDate.toISODate())
  return (
    <>
      {foundTargetDate
        ? <p>Here's your bearthday photos from {targetDate.toISODate()}!</p>
        : <p>We couldn't find your bearthday photos from {targetDate.toISODate()}, but here's the photos from {foundDate.toISODate()}.</p>}
      <PhotoViewer date={foundDate} imageData={imageData} />
    </>
  )
}

export default PhotoSearcher
