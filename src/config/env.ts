import { config } from 'dotenv'
import { type IEnv } from '../interfaces/IEnv.js'

export class Env implements IEnv {
  private readonly _token: string
  private readonly _clientId: string

  constructor () {
    config()
    this._token = process.env.BOT_TOKEN ?? 'no-token'
    this._clientId = process.env.CLIENT_ID ?? 'no-id'
  }

  public getToken (): string {
    return this._token
  }

  public getClientId (): string {
    return this._clientId
  }
}
