const {ApplicationCommandOptionType} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js')

module.exports = {
    name: 'terminar',
    description: 'Terminar partida de blackjack',
    //devOnly: Boolean,

    callback: (client,interaction) => {

        const idUsuario = interaction.user.id;
        const idCanal = interaction.channel.id;
        
        if(!blackjackGame.estaJuegoIniciado(idCanal))
        {
            //interaction.reply("No hay ningun juego iniciado");
            interaction.reply({
                content: "No hay ningun juego iniciado",
                ephemeral: true,
            });
            return;
        }

        if(!blackjackGame.estaUsuarioEnJuego(idUsuario,idCanal) && !(blackjackGame.esDealer(idUsuario,idCanal)))
        {
            interaction.reply({
                content: "No se ha unido al juego",
                ephemeral: true,
            });
            return;
        }

        if(!blackjackGame.esDealer(idUsuario, idCanal))
        {
            //interaction.reply("Solo el dealer puede terminar la partida");
            interaction.reply({
                content: "Solo el dealer puede terminar la partida",
                ephemeral: true,
            });
            return;
        }
        
        blackjackGame.terminarJuego(idCanal);

        interaction.reply(`Ha terminado la partida. Gracias por jugar`);

    },
};