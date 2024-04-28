import { config } from 'dotenv'

config()

export const {
  BOT_TOKEN: TOKEN,
  CLIENT_ID: CLIENTID
} = process.env
