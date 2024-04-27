import { Bot } from './server/server.js'

(() => {
  const serverBot = new Bot()
  serverBot.init()
    .catch((err) => {
      console.error(err)
    })
})()
