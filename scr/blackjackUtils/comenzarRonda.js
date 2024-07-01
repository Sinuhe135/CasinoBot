const blackjackGame = require('./blackjack.js');
const {EmbedBuilder} = require('discord.js');

module.exports = (client,idCanal) =>{
    const canal = client.channels.cache.get(idCanal);

    setTimeout(() => {
        blackjackGame.cambiarEstadoJuego(idCanal,1);
        const embed = new EmbedBuilder()
            .setTitle(`Ronda ${blackjackGame.subirRonda(idCanal)}`)
            .setDescription(`Utilizar /apostar para apostar fichas\nUtilizar /terminar para terminar la partida`)
            .setColor('Red');

        canal.send({embeds:[embed]});
        //canal.send(`**\n\n`);
    },2000);
};