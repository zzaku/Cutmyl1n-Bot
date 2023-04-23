const Discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands')
const loadDatabase = require('../loaders/loadDatabase');

module.exports = async bot => {
    
    bot.db = loadDatabase;

    await loadSlashCommands(bot);

    console.log(`${bot.user.tag} est bien en ligne!`);
}