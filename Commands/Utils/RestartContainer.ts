import { Client, SlashCommandBuilder } from 'discord.js'
import axios from 'axios'
import moment from 'moment'

module.exports = {
  name: 'restart',
  aliases: ['restar'],

  async run(client: Client, message: any, args: any[]) {
    try {
      const { data, status } = await axios.get(
        `http://165.22.36.182:3000/containers/${args[0]}/restart`,
        {
          headers: {
            Authorization: 'API_12345_TOKEN',
          },
        }
      )

      message.channel.send('Container restarted')
      
    } catch (err: any) {
      if (err.response) {
        message.channel.send(`${err.response.status}`)
      }
    }
  },
}
