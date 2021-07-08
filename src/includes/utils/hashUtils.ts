import Crypto from 'crypto'
import fs from 'fs'

const hash_url = function (image_url: string, opt: { hash_length?: number } = {}): string {
  const hash_string = Crypto.createHash('md5').update(image_url).digest('hex')
  return hash_string.slice(0, opt?.hash_length || hash_string.length)
}

const hash_file = function ({
  file_path,
  algorithm = 'md5',
}: {
  file_path: string
  algorithm?: string
}): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const _stream = fs.createReadStream(file_path)
      const _consumer = Crypto.createHash(algorithm)

      _stream.on('readable', function () {
        let data
        while ((data = _stream.read())) {
          _consumer.update(data)
        }
      })

      _stream.on('end', function () {
        const hash = _consumer.digest('hex')
        resolve(hash)
      })

      _stream.on('error', function (err) {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Creates hash of text
 * @param  text
 * @param  algorithm hashing algorithm
 * @return {string} hash of text
 */
const hash_text = function ({ text, algorithm = 'md5' }: { text: string; algorithm?: string }): string {
  return Crypto.createHash(algorithm).update(text).digest('hex')
}

const ALL_3_BYTE_HASHES = Array.from(new Array(4096).keys()).map((x) => x.toString(16).padStart(3, '0'))

export default {
  hash_url,
  hash_file,
  hash_text,
  ALL_3_BYTE_HASHES,
}
