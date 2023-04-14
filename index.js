const discord = require('discord.js');
const bot = new discord.Client({intents: 3276799});
require('dotenv').config();

bot.login(process.env.BOT_TOKEN);


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`Raccourcir les liens`);
    bot.user.setStatus('online');
});

bot.on('disconnect', () => {
    console.log('Disconnected!');
})
    
