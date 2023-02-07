import { Client, SlashCommandBuilder } from 'discord.js'
import axios from 'axios'
import moment from 'moment'
moment.locale('pt-br')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teste')
    .setDescription('pedro ferreira lgbt'),
  name: 'get',
  aliases: ['get'],

  async run(client: Client, message: any, args: any[]) {
    const { data } = await axios.get(
      `http://165.22.36.182:3000/containers/${args[0]}`,
      {
        headers: {
          Authorization: 'API_12345_TOKEN',
        },
      }
    )

    message.channel.send(
      `Status: ${data.State.Status}
      \nStarted at: ${moment(data.State.StartedAt).startOf('hour').fromNow()}
      \nRestarting: ${data.State.Restarting ? 'yes' : 'false'}`
    )
    console.log(data)
  },
}
