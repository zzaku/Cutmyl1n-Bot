const discord = require('discord.js');
const bot = new discord.Client({intents: 3276799});
require('dotenv').config();

bot.commands = new Discord.Collection();
bot.function = {
    verifyUrl: require('./functions/verifyUrl.js'),
    generateShortLink: require('./functions/generateShortLink.js'),
    getUserSql: require('./functions/getUserSql.js'),
    getUrlSql: require('./functions/getUrlSql.js'),
    getAllUrls: require('./functions/getAllUrls.js'),
    addUser: require('./functions/addUser.js'),
    addUrl: require('./functions/addUrl.js'),
    handleSetStateUrl: require('./functions/handleSetStateUrl.js'),
    deleteUrl: require('./functions/deleteUrl.js'),
    getRowWithButtons: require('./functions/getRowWithButtons.js'),
    deleteMessageWithCountdown: require('./functions/deleteMessageWithCountdown.js'),
    sendInteractionReply: require('./functions/sendInteractionReply.js'),
}
bot.login(process.env.BOT_TOKEN);
bot.on('disconnect', (err) => {
    console.log('Bot was disconnected!', err);
    bot.login(process.env.BOT_TOKEN);
  });


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`Raccourcir les liens`);
    bot.user.setStatus('online');
});

bot.on('disconnect', () => {
    console.log('Disconnected!');
})
    
