import { type InternalDiscordGatewayAdapterCreator } from 'discord.js'

export interface IJoinVoiceChannelOptions {
  channelId: string
  guildId: string
  adapterCreator: InternalDiscordGatewayAdapterCreator
}
