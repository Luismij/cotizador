import { ImageLoader } from 'next/image'

export const getMediaUrl = (name: string): string => {
  if (!name) return ''

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001'

  if (name.startsWith('.')) {
    return `${API_URL}${name.slice(1)}`
  }

  return `${API_URL}${name}`
}

export const mediaLoader: ImageLoader = ({ src, width, quality }) => {
  return getMediaUrl(src)
}

export const blobLoader: ImageLoader = ({ src, width, quality }) => {
  if (src) return `${src}`
}
