const TelegramApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require("./options")


const token = "5232786781:AAGrB1bwnPnpdu2uHz3kvOMvfNTUEUSkCG0"


let bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'I think for a number from 1 to 9 and you try to guess a number which I choose')
    const rundomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = rundomNumber
    await  bot.sendMessage(chatId, `Let's start!`, gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Chose it for start'},
        {command: '/info', description: 'Chose it for info'},
        {command: '/game', description: 'Game with numbers'},
        {command: '/music', description: 'Chose it for music'}
    ]
    )
    bot.on('message', async msg => {
     
        const text = msg.text
        const chatId =  msg.chat.id
        const first_name = msg.from.first_name
        const user_name = msg.from.username
    
      if (text === '/start'){
       await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/b20/b88/b20b8847-4ae8-38e0-b22a-b41487aec303/13.webp')
        return bot.sendMessage(chatId, `Hi! Welcome, ${first_name}. I am a bot Voci and I wan't to help you. I have next commands: 
          /start  if you want to start 
          /info if you want to read info about me
          /game if you need to play in my game 
          /read if you want to read somethink
          /listean if you want to music`)
      }
    
        if (text === '/info'){
           return bot.sendMessage(chatId, `My name is Vocii! Your firstname is ${first_name}, username is ${user_name} `)
        
        } 
        if(text === '/game'){
            return startGame(chatId)    
        }
         return bot.sendMessage(chatId, `I don't understand you. Please, try again`)
    })



}


bot.on('callback_query', async msg => {
     const data = msg.data
     const chatId = msg.message.chat.id
     
     if (data === '/again') {
         return startGame(chatId)
     }
     
     if (data === chats[chatId]){
        return bot.sendMessage(chatId, `Congratulation! My nubmer is ${chats[chatId]}`, againOptions)
     } else  {
          return bot.sendMessage(chatId, `Oh no!  my number is  ${chats[chatId]}`, againOptions)
          
     }
})


start()