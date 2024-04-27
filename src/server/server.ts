// import Discord, { IntentsBitField, type Message } from 'discord.js'
// import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice'
// import { config } from 'dotenv'
// import { Commands } from '../bot/commands.js'
// import { messageToLowerCase } from '../utils/lowercase.js'

// export class Bot {
//   private readonly _client: Discord.Client
//   // private readonly _commands
//   private readonly _token: string | undefined

//   constructor () {
//     config()
//     this._client = new Discord.Client({
//       intents: [
//         IntentsBitField.Flags.Guilds,
//         IntentsBitField.Flags.GuildMessages,
//         IntentsBitField.Flags.MessageContent
//       ]
//     })
//     // this._commands = new Commands()
//     this._token = process.env.BOT_TOKEN
//   }

//   public async init (): Promise<void> {
//     await this._client.login(this._token)
//     // this._client.on('messageCreate', async (message: Message) => {
//     //   const { content } = message
//     //   const convertedMessage = messageToLowerCase(content)
//     //   if (convertedMessage === 'ping') {
//     //     await this._commands.pingPong(message)
//     //   }
//     // })
//     // this._client.voice
//     this._client.on('messageCreate', async (message: Message) => {
//       console.log(message)
//       try {
//         if (message.content === '!join') {
//           const member = message?.member?.voice
//           if (member === undefined) throw new Error('error al unirse al canal')
//           joinVoiceChannel({
//             channelId: member.channel.id,
//             guildId: member.guild.id,
//             adapterCreator: member.guild.voiceAdapterCreator
//           })
//         }
//       } catch (error) {
//         const { message: messageError } = error as Error
//         await message.reply(messageError)
//       }
//     })
//     console.log('Discord bot active')
//   }
// }
