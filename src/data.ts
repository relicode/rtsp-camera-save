import chalk from 'chalk'
import ffmpeg from 'fluent-ffmpeg'
import { mkdir } from 'node:fs/promises'

import { formatRecordData, Formatted, generatePaths, generateRtspUrl } from './utils.js'
import type { Extension, RecordData } from './types-and-constants.js'

const { green } = chalk

const ensureDir = async (path: string) => {
  await mkdir(path, { recursive: true })
  return path
}

const handledErrorRE = /Exiting normally, received signal 3\.\s*/

type Record = (url: URL | string, path: string, timeout: number, extension: Extension) => Promise<Formatted>

export const record: Record = (url, path, timeout) =>
  new Promise((res, rej) => {
    let recordData: RecordData

    const command = ffmpeg(new URL(url).toString())
      .videoCodec('copy')
      .audioCodec('copy')
      .on('start', (cmd) => {
        console.log(green.greenBright('Started:'), green.green.underline(cmd))
        setTimeout(() => {
          command.kill('SIGQUIT')
        }, timeout)
      })
      .on('codecData', (codecData) => {
        recordData = { ...recordData, ...codecData }
      })
      .on('progress', ({ targetSize }) => {
        console.log(green('Processing...'))
        recordData.targetSize = targetSize
      })
      /*
      .on('end', (stdout, stderr) => {
        if (stderr) console.log(red('Ended'), stderr)
        if (stdout) console.log(green('Ended'), stdout)
      })
      */
      .on('error', (e) => {
        const handled = handledErrorRE.test(e.message)
        if (handled) res({ ...formatRecordData({ ...recordData, filePath: path }) })
        else rej(e)
      })

      .save(path)
  })

export const saveCamera = async (name: string, { timeout = 5, extension = 'mkv' as Extension } = {}) => {
  const { dirPath, filePath } = generatePaths(name)
  await ensureDir(dirPath)
  const cmd = await record(generateRtspUrl(), filePath, timeout * 1000, extension)
  console.log(cmd)
}
