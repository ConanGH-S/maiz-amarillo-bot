import { type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'
import { type IDisconnect } from '../interfaces/ICommands.js'

export class Disconnect implements IDisconnect {
  constructor () {}

  createCommand (): RESTPostAPIChatInputApplicationCommandsJSONBody {

  }
}
