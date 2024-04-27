import { type Message } from 'discord.js'

export class Commands {
  public async pingPong (message: Message): Promise<void> {
    await message.reply('pong...')
  }
}
