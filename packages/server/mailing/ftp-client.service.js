'use strict'

const Client = require('ssh2-sftp-client')
const SocksClient = require('socks').SocksClient
const request = require('request')
const url = require('url')
const fs = require('fs-extra')
const crypto = require('crypto')
const config = require('../node.config.js')

class FTPClient {
  constructor(
    host = 'localhost',
    port = 22,
    username = 'anonymous',
    password = 'guest',
  ) {
    this.client = new Client()
    this.settings = {
      host: host,
      port: port,
      username: username,
      password: password,
    }
  }

  async upload(sourceArray, folderPath) {
    const self = this,
      client = this.client,
      current_date = new Date().valueOf().toString(),
      random = Math.random().toString(),
      tmpDir = `/tmp/${crypto
        .createHash('sha1')
        .update(current_date + random)
        .digest('hex')}`

    fs.mkdirSync(tmpDir)

    try {
      const { socket } = await this.getProxy()

      await client.connect({
        sock: socket,
        ...self.settings,
      })
      await client.mkdir(folderPath, true)

      const uploads = sourceArray.map((fileUrl) => {
        const fileName = self.fileName(fileUrl)
        const requestedFile = request.get(fileUrl)
        const file = fs.createWriteStream(`${tmpDir}/${fileName}`)

        return new Promise((resolve, reject) => {
          requestedFile
            .on('data', (data) => {
              file.write(data)
            })
            .on('end', () => {
              file.end()
              resolve(
                client.fastPut(
                  `${tmpDir}/${fileName}`,
                  `${folderPath}${fileName}`,
                ),
              )
            })
        })
      })

      await Promise.all(uploads)
    } catch (err) {
      console.log('ERROR', err)
    } finally {
      console.log('END OF UPLOADING')
      fs.removeSync(`${tmpDir}`)
      await client.end()
    }

    return client
  }

  fileName(fileUrl) {
    return url
      .parse(fileUrl)
      .pathname.replace(/\//g, ` `)
      .trim()
      .replace(/\s/g, `-`)
  }

  getProxy() {
    const self = this,
      proxy = new url.URL(config.proxyUrl)

    return SocksClient.createConnection({
      proxy: {
        host: proxy.hostname,
        port: 1080,
        type: 5,
        userId: proxy.username,
        password: proxy.password,
      },
      command: 'connect',
      destination: {
        host: self.settings.host,
        port: self.settings.port,
      },
    })
  }
}

module.exports = FTPClient