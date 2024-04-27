import Discord, { IntentsBitField } from 'discord.js'
import { config } from 'dotenv'

export class Bot {
  private readonly _client: Discord.Client
  private readonly _token: string | undefined

  constructor () {
    config()
    this._client = new Discord.Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers
      ]
    })
    this._token = process.env.BOT_TOKEN
  }

  public async init (): Promise<void> {
    await this._client.login(process.env.BOT_TOKEN)
    console.log('Discord bot active')
  }
}
