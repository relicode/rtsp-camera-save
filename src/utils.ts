import { dirname, join } from 'node:path'
import { BASE_PATH, Extension, RecordData } from './types-and-constants.js'

export const formatBytes = (bytes: number, decimals = 2) => {
  const k = 1024

  bytes *= k
  if (!+bytes) return '0 Bytes'

  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const generatePaths = (dirName: string, extension: Extension = Extension.MKV) => {
  const filePath = join(BASE_PATH, dirName, `${new Date().toISOString()}.${extension}`)
  const dirPath = dirname(filePath)
  return { dirPath, filePath }
}

export const generateRtspUrl = ({ user = 'user', pass = 'pass', host = '192.168.10.89', path = '/live/ch0' } = {}) =>
  new URL(`rtsp://${user}:${pass}@${host}${path}`).toString()

export const formatRecordData = ({ audio_details, video_details, targetSize, ...rest }: RecordData) => ({
  ...rest,
  audioDetails: audio_details,
  videoDetails: video_details,
  targetSize: formatBytes(targetSize),
})

export type Formatted = ReturnType<typeof formatRecordData>
