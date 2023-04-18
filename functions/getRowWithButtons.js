const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = async (shortenedUrl, button) => {

      const row = new ActionRowBuilder()
      .addComponents(
            new ButtonBuilder()
                .setCustomId(`delete:${shortenedUrl.fullyShortenedUrl}`)
                .setLabel('Supprimer')
                .setStyle('Danger')
                .setDisabled(false),
            button,
            new ButtonBuilder()
                .setURL(`https://cutmyl1nk.fr/${shortenedUrl.fullyShortenedUrl}`)
                .setLabel('Voir le lien')
                .setStyle('Link')
                .setDisabled(false)
      );
  
    return row;
  }