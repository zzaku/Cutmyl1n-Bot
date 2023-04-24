const { EmbedBuilder, Events } = require('discord.js');

module.exports = {

      async run (bot, currentChannel, db, userId, username, original_url){

        currentChannel.createWebhook(
            {
                name: `Great Teacher ${username}`,
                avatar: 'https://styles.redditmedia.com/t5_2tww0/styles/communityIcon_o7izg9vb3ih61.jpg',
            }
        )
        .then(async myWebhook => {
            try {
                await bot.function.addWebhook(db, 'webhook', {user_id: userId, webhook_id: myWebhook.id, webhook_token: myWebhook.token, channel_id: currentChannel.id, original_url})
            } catch (error) {
                throw new Error(error);
            }
         })
        .catch(console.error);

        bot.on(Events.MessageCreate, async message => {

            try {
                if(!userId) return;
                
                if(!message.embeds[0]?.data?.title) return;

                const webhook = await bot.function.getWebhook(db, 'webhook_id', 'webhook', {user_id: userId, original_url: message.embeds[0]?.data?.title});

                if (!webhook) return;

                if (message.author.id !== webhook[0]?.webhook_id) return;      

                let isMessageAlreadyCreated = await bot.function.getWebhook(db, '*', 'webhook', {user_id: userId, message_id: message.id});

                if(isMessageAlreadyCreated.length === 0){
                    await bot.function.updateWebhook(db, 'webhook', {user_id: userId, original_url: message.embeds[0].data.title}, {message_id: message.id});
                } else return;

            } catch (error) {
                console.error('Error trying to send a message: ', error);
            }
        });
    }
}