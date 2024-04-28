import { type Client, SlashCommandBuilder, type RESTPostAPIChatInputApplicationCommandsJSONBody, type Interaction } from 'discord.js'
import { type IDisconnect } from '../interfaces/ICommands.js'
import { getVoiceConnection } from '@discordjs/voice'
import { EmbedBuilder } from 'discord.js'

export class Disconnect implements IDisconnect {
  constructor (private readonly _client: Client) {
    this._client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'disconnect') {
          try {
            if (interaction.guildId === null) throw new Error()
            const connection = getVoiceConnection(interaction.guildId)
            connection?.destroy()
            const exitEmbed = new EmbedBuilder()
              .setColor('#E00B00')
              .setDescription('Se ha desconectado')
            await interaction.reply({
              embeds:
              [exitEmbed]
            })
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
      .setName('disconnect')
      .setDescription('Disconnect the bot from the voice channel')
      .toJSON()
  }
}
