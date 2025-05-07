export const BASE_PATH = '/tmp' as const

export enum Extension {
  MKV = 'mkv',
  MP4 = 'mp4',
}

export type RecordData = {
  format: string
  audio: string
  audio_details: string[]
  video: string
  video_details: string[]
  duration: string
  targetSize: number
  filePath: string
}
