import { type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'

export interface IJoin {
  createCommand: () => RESTPostAPIChatInputApplicationCommandsJSONBody
}

export interface IDisconnect {
  createCommand: () => RESTPostAPIChatInputApplicationCommandsJSONBody
}
