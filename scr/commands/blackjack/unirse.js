const {ApplicationCommandOptionType} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js')

module.exports = {
    name: 'unirse',
    description: 'Unirse a juego de blackjack',
    //devOnly: Boolean,

    callback: (client,interaction) => {

        const idUsuario = interaction.user.id;
        const idCanal = interaction.channel.id;
        
        if(!blackjackGame.estaJuegoIniciado(idCanal))
        {
            interaction.reply({
                content: "No hay ningun juego iniciado en este canal",
                ephemeral: true,
            });
            return;
        }

        if(blackjackGame.verEstadoJuego(idCanal) != 0)
        {
            interaction.reply({
                content: "No es posible unirse en este momento",
                ephemeral: true,
            });
            return;
        }

        if(blackjackGame.estaUsuarioEnJuego(idUsuario,idCanal) || blackjackGame.esDealer(idUsuario,idCanal))
        {
            interaction.reply({
                content: "Ya te has unido",
                ephemeral: true,
            });
            return;
        }
        
        blackjackGame.unirseAJuego(idUsuario,idCanal);

        interaction.reply(`${interaction.user} se ha unido a la mesa`);

    },
};