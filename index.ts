import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { statSync, readdirSync } from 'fs'
require('dotenv').config()

export const commands = new Collection()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

readdirSync(process.env.PATH_EVENTS ?? './Events').forEach((file) => {
  const filePath = process.env.PATH_EVENTS + '/' + file
  let eventFunction = require(filePath)
  let eventName = file.split('.')[0]
  client.on(eventName, (...args) => eventFunction.run(client, ...args))
})

function initializeCommands(path: string) {
  readdirSync(path).forEach(async (file) => {
    try {
      const filePath = path + '/' + file
      if (file.endsWith('.ts')) {
        const commandFunction = require(filePath)
        commands.set(file, commandFunction)
      } else if (statSync(filePath).isDirectory()) {
        initializeCommands(filePath)
      }
    } catch (error) {
      console.log(error)
    }
  })
}
initializeCommands(process.env.PATH_COMMANDS ?? './Commands')

client.login(process.env.TOKEN)
