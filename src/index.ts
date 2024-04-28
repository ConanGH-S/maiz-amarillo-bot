import { Discord } from './services/discord.js'

(() => {
  const discord = new Discord()

  discord.init()
    .then(() => {
      console.log('Tamos activo papi')
    })
    .catch(err => {
      console.error(err)
    })
})()
