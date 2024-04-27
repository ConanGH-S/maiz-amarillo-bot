// import { Bot } from './server/server.js'
import Discord, { IntentsBitField, type Interaction, Routes, SlashCommandBuilder, ChannelType } from 'discord.js'
import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import { joinVoiceChannel } from '@discordjs/voice'
import { type IJoinVoiceChannelOptions } from './bot/interfaces/IVoiceChannel.js'

// let client: Discord.Client

// (async () => {
//   const serverBot = new Bot()
//   serverBot.init()
// })().catch(console.error)

config()

const client = new Discord.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

const TOKEN: string = process.env.BOT_TOKEN ?? '123'

client.on('interactionCreate', async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'join') {
      try {
        const voiceChannel = interaction.options.getChannel('channel')

        if (voiceChannel === null || interaction.guild === null) throw new Error()

        const JoinVoiceChannelOptions: IJoinVoiceChannelOptions = {
          channelId: voiceChannel.id,
          guildId: interaction.guildId ?? '123',
          adapterCreator: interaction.guild.voiceAdapterCreator
        }

        joinVoiceChannel({
          channelId: JoinVoiceChannelOptions.channelId,
          guildId: JoinVoiceChannelOptions.guildId,
          adapterCreator: JoinVoiceChannelOptions.adapterCreator
        })
        await interaction.reply(`Se unio al canal <#${voiceChannel?.id}>`)
      } catch (error) {
        await interaction.reply('Ha ocurrido un error')
        console.error(error)
      }
    }
  }
})

const CLIENTID: string = process.env.CLIENT_ID ?? '123'

const rest = new REST({ version: '10' }).setToken(TOKEN)

async function main (): Promise<void> {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(CLIENTID), {
      body: [
        new SlashCommandBuilder()
          .setName('join')
          .setDescription('Joins a voice channel')
          .addChannelOption((option) =>
            option
              .setName('channel')
              .setDescription('The channel to join')
              .setRequired(true)
              .addChannelTypes(ChannelType.GuildVoice)
          )
          .toJSON()
      ]
    })

    console.log('Successfully reloaded application (/) commands.')
    await client.login(TOKEN)
  } catch (error) {
    console.error(error)
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

void main()
