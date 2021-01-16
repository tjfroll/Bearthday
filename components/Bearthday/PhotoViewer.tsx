import React from 'react'
import { DateTime } from 'luxon'
import styles from './PhotoViewer.module.css'

export type ImageData = {
  image: string
}

interface Props  {
  date: DateTime
  imageData: ImageData[]
}

type ImageType = 'jpg' | 'png'

const DATE_FORMAT = 'yyyy/MM/dd'
const BASE_IMAGE_URL = 'https://epic.gsfc.nasa.gov/archive/enhanced'

export const getImageUrl = (date: string, image: string, imageType: ImageType = 'jpg'): string =>
  `${BASE_IMAGE_URL}/${date}/${imageType}/${image}.${imageType}`

export const getImageUrlsFromData = (date: DateTime, imageData: ImageData[]): string[] => {
  const dateUrl = date.toFormat(DATE_FORMAT)
  return imageData.map(({ image }) => getImageUrl(dateUrl, image))
}

export const PhotoViewer = ({ date, imageData }: Props) => {
  const imageUrls = getImageUrlsFromData(date, imageData)
  return (
    <section className={styles.photoViewer}>
      {imageUrls.map((url) => <img className={styles.photo} src={url} key={url} />)}
    </section>
  )
}

export default PhotoViewer
