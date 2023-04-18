const Discord = require('discord.js');

module.exports = {

    name: 'ping',
    description: 'Affiche la latence du bot',
    permission: "Aucune",
    dm: true,
    autoComplete: false,

    async run(bot, message){

        await message.reply(`Ping : ${bot.ws.ping}`);
    }
}