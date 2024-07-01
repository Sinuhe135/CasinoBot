module.exports = {
    name: 'ping',
    description: 'Latencia con el bot',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],
    deleted:false,

    callback: (client,interaction) => {
        interaction.reply(client.ws.ping+' ms');
    }
};