const fs = require('fs');

module.exports = async bot => {

    fs.readdirSync('./events').filter(f => f.endsWith('.js')).forEach(async file => {
        
        let event = require(`../events/${file}`);
        await bot.on(file.split(".js").join(""), event.bind(null, bot));
        console.log(`Evènement ${file} chargé avec succès`);
        
    });
}