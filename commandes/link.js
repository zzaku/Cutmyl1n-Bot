const { ChannelType, PermissionsBitField, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {

    name: 'link',
    description: 'Génère un lien raccourci',
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: 'string',
            name: 'url',
            description: 'URL du lien',
            required: true,
            autoComplete: true,
        }
    ],

    async run(bot, message, args, db){

        if(message.user.bot) return;

        let link = args.get('url').value;

        let shortUrl = bot.function.generateShortLink();

        let linkId = Buffer.alloc(8);
        linkId.writeBigInt64BE(BigInt(message.id))
        linkId.toString('hex');

        let userId = Buffer.alloc(8);
        userId.writeBigInt64BE(BigInt(message.user.id))
        userId = userId.toString('hex');

        let fullyShortenedUrl = shortUrl + '-' + message.user.id;
        
        let shortenedUrls = {};

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`delete:${fullyShortenedUrl}`)
                    .setLabel('Supprimer')
                    .setStyle('Danger')
                    .setDisabled(false),
                new ButtonBuilder()
                    .setCustomId(`disable:${fullyShortenedUrl}`)
                    .setLabel('Désactiver')
                    .setStyle('Primary')
                    .setDisabled(false),
                new ButtonBuilder()
                    .setURL(`https://cutmyl1nk.fr/${fullyShortenedUrl}`)
                    .setLabel('Voir le lien')
                    .setStyle('Link')
                    .setDisabled(false)
                );

        try {
            
            let isValidUrl = await bot.function.verifyUrl(link);
            const regex = /(https?:\/\/)?(www\.)?/i;
            link = link.replace(regex, '');
            
            if (isValidUrl) {


                let user = {id: userId, username: message.user.username};
                let url = {id: linkId, user_id: userId, original_url: link, short_url: fullyShortenedUrl}

                let getUrlByOriginalUrl = {user_id: userId, original_url: link}
                let getUrlByShortenedUrl = {user_id: userId, short_url: fullyShortenedUrl}

                let flags = [PermissionsBitField.Flags.CreateInstantInvite, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.PrioritySpeaker, PermissionsBitField.Flags.Stream, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.ViewGuildInsights, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.MuteMembers, PermissionsBitField.Flags.DeafenMembers, PermissionsBitField.Flags.MoveMembers, PermissionsBitField.Flags.UseVAD, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,];

                let channelName = `liens-de-${(message.user.username).toLowerCase()}`;

                try {

                    //Si l'utilisateur a déja créer 5 liens raccourci, il ne pourra plus en créer d'autre
                    let isAllowedToShortenLink = await bot.function.getRowsOfAllUrls(db, 'COUNT(*) as count', 'urls', 'user_id', userId);
                    if(!isAllowedToShortenLink) return message.reply({ content: "Vous avez déjà crée 5 liens raccourci, vous ne pouvez pas en créer d'autre à moins d'en supprimer ", ephemeral: true });

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                    //Lutilisateur n'est pas encore enregistré
                    let isAlreadyRegistered = await bot.function.getUserSql(db, 'COUNT(*) as count', 'userDiscord', 'id', userId);

                    if(!isAlreadyRegistered) {
                        try{
                            await bot.function.addUser(db, 'userDiscord', user);
                        } catch (error) {
                            return message.reply({ content: "Il y'a eu un problème d'enregistration, veuillez résaayer plus tard", ephemeral: true });
                        }
                    }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                    //Enregistrement de son lien raccourci s'il n'existe pas déja
                    
                    let isAlreadyshortened = await bot.function.getUrlSql(db, 'COUNT(*) as count', 'urls', getUrlByOriginalUrl, getUrlByShortenedUrl);

                    if(!isAlreadyshortened) {

                        const linkEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(link)
                        .setURL(`https://cutmyl1nk.fr/${fullyShortenedUrl}`)
                        .setAuthor({ name: 'Cutmyl1nk', iconURL: 'https://cutmyl1nk.fr/inc/assets/logo.png', url: 'https://cutmyl1nk.fr' })
                        .setDescription(`https://cutmyl1nk.fr/${fullyShortenedUrl}`)
                        .setThumbnail('https://cutmyl1nk.fr/inc/assets/logo.png')
                        .addFields(
                            { name: 'Tu peux créer un lien plus court sur', value: 'https://cutmyl1nk.fr' },
                            { name: '\u200B', value: '\u200B' },
                            )
                            .setImage('https://cutmyl1nk.fr/inc/assets/logo.png')
                            .setTimestamp()
                            .setFooter({ text: 'made by Zakuu', iconURL: 'https://cutmyl1nk.fr/inc/assets/logo.png' });
                            
                        try{
                            await bot.function.addUrl(db, 'urls', url);
                            let linkCategory = await message.guild.channels.cache.find(channel => channel.name === 'Vos liens raccourci');
        
                            if(!linkCategory){

                                linkCategory = await message.guild.channels.create({
                                    name: "Vos liens raccourci",
                                    type: ChannelType.GuildCategory,
                                });
                            }

                            let linkSalon = await message.guild.channels.cache.find(channel => channel.name === channelName);

                            if(!linkSalon){

                                linkSalon = await message.guild.channels.create({
                                    name: channelName,
                                    type: ChannelType.GuildText,
                                    parent: linkCategory,
                                    permissionOverwrites: [
                                        {
                                            id: message.guild.id,
                                            deny: flags,
                                            allow: []
                                        },
                                        {
                                            id: bot.user.id,
                                            allow: flags,
                                            deny: [],
                                        },
                                        {
                                            id: message.user.id,
                                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                                            deny: [],
                                        },
                                    ],
                                });
                            }
                            
                            if(linkSalon.id === message.channel.id){
                               
                                await message.reply({ embeds: [linkEmbed], ephemeral: false, components: [row] });

                            } else {
                                await linkSalon.send({ embeds: [linkEmbed], ephemeral: false, components: [row] });
                                await bot.function.deleteMessageWithCountdown("reply", message, `**Ton lien à été généré sur ce channel : \<#${linkSalon.id}>**`, 5, "#16a085", true);
                            }
                            
                        } catch (error) {
                            return message.reply({ content: "Il y'a eu un problème d'enregistration, veuillez résaayer plus tard", ephemeral: true });
                        }
                    } else {
                        return message.reply({ content: "Vous avez déjà un lien raccourci avec cette URL", ephemeral: true });
                    }

                } catch (error) {
                    return message.reply({ content: "Il y'a eu un problème de vérification de vos informations, Veuillez résaayer plus tard", ephemeral: true });
                }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            } else {
                
                return message.reply({ content: "L'URL est invalide !", ephemeral: true });
            }

        } catch (error) {

            if(error === 'invalid') return message.reply({ content: "L'URL est invalide !", ephemeral: true });
            else return message.reply({ content: "Il y'a eu un probleme avec l'URL, elle est inaccessible !", ephemeral: true });
        }

        bot.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            
            let myUrls = await bot.function.getAllUrls(db, '*', 'urls', 'user_id', userId);
            await myUrls.map(url => shortenedUrls[url.short_url] = {fullyShortenedUrl: url.short_url});

            const [actionType, urlType] = interaction.customId.split(':');
            const shortenedUrl = shortenedUrls[urlType];

            if (actionType === 'disable') {
                const updatedEnableButton = new ButtonBuilder()
                    .setCustomId(`enable:${urlType}`)
                    .setLabel('Activer')
                    .setStyle('Success')
                    .setDisabled(false);
                    
                if (shortenedUrl) {
                    const row = await bot.function.getRowWithButtons(shortenedUrl, updatedEnableButton);
                    await interaction.deferUpdate();
                    await interaction.editReply({ components: [row] });
                    await bot.function.handleSetStateUrl(db, 'urls', { short_url: shortenedUrl.fullyShortenedUrl, user_id: userId }, { is_active: 0 });
                }
        
            } else if (actionType === 'enable') {
                const updatedDisableButton = new ButtonBuilder()
                    .setCustomId(`disable:${urlType}`)
                    .setLabel('Désactiver')
                    .setStyle('Primary')
                    .setDisabled(false);
        
                if (shortenedUrl) {
                    const row = await bot.function.getRowWithButtons(shortenedUrl, updatedDisableButton);
                    await interaction.deferUpdate();
                    await interaction.editReply({ components: [row] });
                    await bot.function.handleSetStateUrl(db, 'urls', { short_url: shortenedUrl.fullyShortenedUrl, user_id: userId }, { is_active: 1 });
                }
        
            } else if (actionType === 'delete') {
                if (shortenedUrl) {
                    await bot.function.deleteUrl(db, 'urls', { short_url: shortenedUrl.fullyShortenedUrl, user_id: userId });
                    await interaction.message.delete();
                    await delete shortenedUrls[urlType];
                    await bot.function.deleteMessageWithCountdown("reply", interaction, `Le lien **${link}** a été supprimé.`, 5, "#16a085", false);

                    const allMessages = await interaction.channel.messages.fetch();
                    if (allMessages.size === 0) {
                        await interaction.channel.delete();
                    }
                }
            }
        });

            bot.on('error', async error => {
                if(error.code === 40060 || error.code === 10062 || error.code === 10008)return;
                await console.error("Réssayer dans quelque seconde le temps que le lien s'active")
                await bot.function.deleteMessageWithCountdown("send", message.channel, `Réssayer dans quelque seconde le temps que le lien s'active`, 5, "#16a085", false);
            });
    }
}