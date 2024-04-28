import { Client, IntentsBitField, Routes } from 'discord.js'
import { CLIENTID, TOKEN } from '../config/env.js'
import { REST } from '@discordjs/rest'
import { type IDiscord } from '../interfaces/IDiscord.js'
import { Join } from '../commands/join.js'

export class Discord implements IDiscord {
  private readonly _client: Client
  private readonly _clientId: string
  private readonly _token: string
  private readonly _rest: REST
  private readonly _join: Join

  constructor () {
    this._client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
      ]
    })
    this._token = TOKEN ?? 'no-token'
    this._clientId = CLIENTID ?? 'no-client-id'
    this._rest = new REST({ version: '10' }).setToken(this._token)
    this._join = new Join()
  }

  async init (): Promise<void> {
    /**
     * Creación de las rutas para los comandos necesarios
     * @async
     */
    await this._rest.put(Routes.applicationCommands(this._clientId), {
      body: [
        this._join.run()
      ]
    })
    console.log('Discord commands ready!')
    await this._client.login(this._token)
  }
}
