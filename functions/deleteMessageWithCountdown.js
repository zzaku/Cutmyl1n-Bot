const { EmbedBuilder } = require('discord.js');

module.exports = async (optionMessage, interaction, messageContent, seconds, color, isEphemeral) => {
    const embed = new EmbedBuilder()
      .setDescription(`${messageContent}\n\n_Ce message sera supprimé dans ${seconds} secondes._`)
      .setColor(color);
  
    const message = optionMessage === "reply" ? await interaction.reply({ embeds: [embed], ephemeral: isEphemeral }) : optionMessage === "send" && await interaction.send({ embeds: [embed], ephemeral: isEphemeral });
    
    for (let i = seconds; i > 0; i--) {
      const newEmbed = new EmbedBuilder()
        .setDescription(`${messageContent}\n\n_Ce message sera supprimé dans ${i - 1} secondes._`)
        .setColor(color);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      await message.edit({ embeds: [newEmbed] });
    }
    
    await message.delete();
  }