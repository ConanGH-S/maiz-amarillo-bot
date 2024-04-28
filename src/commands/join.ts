import { ChannelType, SlashCommandBuilder } from 'discord.js'

export class Join {
  run (): any {
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

// client.on('interactionCreate', async (interaction: Interaction) => {
//   if (interaction.isChatInputCommand()) {
//     if (interaction.commandName === 'join') {
//       try {
//         const voiceChannel = interaction.options.getChannel('channel')

//         if (voiceChannel === null || interaction.guild === null) throw new Error()

//         const JoinVoiceChannelOptions: IJoinVoiceChannelOptions = {
//           channelId: voiceChannel.id,
//           guildId: interaction.guildId ?? '123',
//           adapterCreator: interaction.guild.voiceAdapterCreator
//         }

//         joinVoiceChannel({
//           channelId: JoinVoiceChannelOptions.channelId,
//           guildId: JoinVoiceChannelOptions.guildId,
//           adapterCreator: JoinVoiceChannelOptions.adapterCreator
//         })
//         await interaction.reply(`Se unio al canal <#${voiceChannel?.id}>`)
//       } catch (error) {
//         await interaction.reply('Ha ocurrido un error')
//         console.error(error)
//       }
//     }
//   }
// })
