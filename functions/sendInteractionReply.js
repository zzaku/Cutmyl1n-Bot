module.exports = async (interaction, content) => {
    // Vérifier si la réponse a déjà été envoyée
    if (interaction.replied) {
      return;
    }
  
    // Envoyer la réponse
    await interaction.reply({ content: content, ephemeral: true });
  
    // Définir un délai pour supprimer la réponse
    setTimeout(async () => {
      // Vérifier si la réponse existe encore
      if (interaction.channel?.messages?.cache?.get(interaction?.message?.id)) {
        // Supprimer la réponse
        await interaction.deleteReply();
      }
    }, 10000);
  }