import { Client, IntentsBitField, Routes } from 'discord.js'
import { Env } from '../config/env.js'
import { type IEnv } from '../interfaces/IEnv.js'
import { REST } from '@discordjs/rest'
import { type IDiscord } from '../interfaces/IDiscord.js'
import { Join } from '../commands/join.js'
import { type IJoin } from '../interfaces/ICommands.js'

export class Discord implements IDiscord {
  private readonly _client: Client
  private readonly _rest: REST

  private readonly _env: IEnv
  private readonly _join: IJoin

  private readonly _token: string
  private readonly _clientId: string

  constructor () {
    this._client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
      ]
    })
    this._env = new Env()
    this._token = this._env.getToken()
    this._clientId = this._env.getClientId()
    this._rest = new REST({ version: '10' }).setToken(this._token)
    this._join = new Join(this._client)
  }

  public async init (): Promise<void> {
    /**
     * Creación de las rutas para los comandos necesarios
     * @async
     */
    await this._rest.put(Routes.applicationCommands(this._clientId), {
      body: [
        this._join.createCommand()
      ]
    })
    console.log('Discord commands ready!')
    await this._client.login(this._token)
  }
}
