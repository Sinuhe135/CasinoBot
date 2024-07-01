const blackjackGame = require('./blackjack.js');
const {EmbedBuilder} = require('discord.js');

module.exports = (client,idCanal) =>{
    const canal = client.channels.cache.get(idCanal);

    setTimeout(() => {
        const embed = new EmbedBuilder()
            .setTitle(`Turno del dealer`)
            .setDescription(`Todos los jugadores han tirado\n\n<@${blackjackGame.verDealer(idCanal)}>, utiliza /cartas para indicar la suma de tus cartas`)
            .setColor('Red');

        canal.send({embeds:[embed]});
    },2000);
};