const Discord = require('discord.js');
const {ChannelType, PermissionsBitField, EmbedBuilder} = require('discord.js');
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
    setColorMessage: require('./functions/setColorMessage.js'),
}

bot.login(process.env.BOT_TOKEN);
bot.on('disconnect', (err) => {
    console.log('Bot was disconnected!', err);
    bot.login(process.env.BOT_TOKEN);
  });

loadCommands(bot);
loadEvents(bot);

bot.on('guildCreate', async guild => {
  const infoEmbed = new EmbedBuilder()
      .setColor("#16a085")
      .setTitle("Raccourcisseur de liens")
      .setDescription("Bot Discord qui vous permet de raccourcir des liens.")
      .addFields(
          { name: ":link: Comment raccourcir un lien ?", value: "Utilisez la commande `/link <lien>` pour raccourcir votre lien. Le bot vous enverra un message contenant le lien raccourci." },
          { name: ":mute: Désactiver ou supprimer un lien", value: "Vous pouvez désactiver ou supprimer un lien raccourci en cliquant sur les boutons correspondants dans le message du bot." },
          { name: ":information_source: Quelles sont les informations collectées ?", value: "Le bot enregistre plusieurs informations telles que l'adresse IP des personnes qui cliquent sur vos liens raccourcis. Seul le créateur du lien reçoit ces informations." },
          { name: ":computer: Cutmyl1nk en version site web", value: "Accédez à Cutmyl1nk en version site web sur https://cutmyl1nk.fr." }
          )
          .setFooter({text: "Zakuu#4572"});

  let botCategory = await guild.channels.cache.find(channel => channel.name === "info-bot");
  let botSalon = await guild.channels.cache.find(channel => channel.name === "cutmyl1nk");
  
  if(!botCategory){
    botCategory = await guild.channels.create({
      name: "info-bot",
      type: ChannelType.GuildCategory,
     });
  }

  if(!botSalon){
    botSalon = await guild.channels.create({
      name: "cutmyl1nk",
      type: ChannelType.GuildText,
      parent: botCategory,
      permissionOverwrites: [
        {
          id: guild.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
          deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Connect]
        },
        {
          id: guild.roles.everyone.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
          deny: [PermissionsBitField.Flags.CreateInstantInvite, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.AddReactions],
        }
      ],
    });
  }

  await botSalon.send({ embeds: [infoEmbed], ephemeral: false });
});
