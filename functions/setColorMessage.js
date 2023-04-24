const { EmbedBuilder } = require('discord.js');

module.exports = async (shortenedUrl, color) => {

      const message = new EmbedBuilder()
            .setColor(color)
            .setTitle(shortenedUrl.original_url)
            .setURL(`https://cutmyl1nk.fr/${shortenedUrl.fullyShortenedUrl}`)
            .setAuthor({ name: 'Cutmyl1nk', iconURL: 'https://cutmyl1nk.fr/inc/assets/logo.png', url: 'https://cutmyl1nk.fr' })
            .setDescription(`https://cutmyl1nk.fr/${shortenedUrl.fullyShortenedUrl}`)
            .setThumbnail('https://cutmyl1nk.fr/inc/assets/logo.png')
            .addFields(
                { name: 'Tu peux créer un lien plus court sur', value: 'https://cutmyl1nk.fr' },
                { name: '\u200B', value: '\u200B' },
            )
            .setImage('https://cutmyl1nk.fr/inc/assets/logo.png')
            .setTimestamp()
           .setFooter({ text: 'made by Zakuu', iconURL: 'https://cutmyl1nk.fr/inc/assets/logo.png' });
  
    return message;
}