const Discord = require('discord.js');
const bot = new Discord.Client({intents: 3276799});
const loadCommands = require('./loaders/loadCommands.js');
const loadEvents = require('./loaders/loadEvents.js');
require('dotenv').config();

bot.commands = new Discord.Collection();
bot.function = {
    verifyUrl: require('./functions/verifyUrl.js'),
    generateShortLink: require('./functions/generateShortLink.js'),
    getUserSql: require('./functions/getUserSql.js'),
    getExistingUrlSql: require('./functions/getExistingUrlSql.js'),
    getRowsOfAllUrls: require('./functions/getRowsOfAllUrls.js'),
    getAllUrls: require('./functions/getAllUrls.js'),
    addUser: require('./functions/addUser.js'),
    addUrl: require('./functions/addUrl.js'),
    handleSetStateUrl: require('./functions/handleSetStateUrl.js'),
    deleteUrl: require('./functions/deleteUrl.js'),
    getRowWithButtons: require('./functions/getRowWithButtons.js'),
    deleteMessageWithCountdown: require('./functions/deleteMessageWithCountdown.js'),
    sendInteractionReply: require('./functions/sendInteractionReply.js'),
    getUrlSql: require('./functions/getUrlSql.js'),
    isWebhookLoaded: require('./functions/isWebhookLoaded.js'),
    updateWebhook: require('./functions/updateWebhook.js'),
    loadWebhooks: require('./loaders/loadWebHooks.js'),
    addWebhook: require('./functions/addWebhook.js'),
    getWebhook: require('./functions/getWebhook.js'),
}
bot.login(process.env.BOT_TOKEN);
bot.on('disconnect', (err) => {
    console.log('Bot was disconnected!', err);
    bot.login(process.env.BOT_TOKEN);
  });

loadCommands(bot);
loadEvents(bot);
