import { Client } from 'discord.js'
import axios from 'axios'

module.exports = {
  name: 'ping',
  aliases: ['pingue'],

  async run(client: Client, message: any, args: any[]) {
    const API: number = Date.now()

    await axios
      .get(`http://165.22.36.182:3000/containers/ba3a3355d5d8`, {
        headers: {
          Authorization: 'API_12345_TOKEN',
        },
      })
      .then(() => {
        var PING_API = API - message.createdAt

        let ping: number = Date.now() - message.createdAt
        let api: number = client.ws.ping
        message.channel.send(
          `Ping: **${ping}ms**\nWebSocket: **${api}ms**\nAPI Intraa: **${PING_API}ms**`
        )
      })
  },
}
