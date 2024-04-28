import { ChannelType, type Client, SlashCommandBuilder, type Interaction, type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'
import { type IJoinVoiceChannelOptions } from '../interfaces/IVoiceChannel.js'
import { joinVoiceChannel } from '@discordjs/voice'
import { type IJoin } from '../interfaces/ICommands.js'

export class Join implements IJoin {
  constructor (private readonly _client: Client) {
    this._client.on('interactionCreate', async (interaction: Interaction) => {
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
  }

  public createCommand (): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
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
  }
}
