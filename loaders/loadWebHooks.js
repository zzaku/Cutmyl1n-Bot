const fs = require('fs');

module.exports = async (bot, currentChannel, db, userId, username, original_url) => {

    fs.readdirSync('./webHooks').filter(f => f.endsWith('.js')).forEach(async file => {

        let command = require(`../webHooks/${file}`);
        command.run(bot, currentChannel, db, userId, username, original_url);
    });
}