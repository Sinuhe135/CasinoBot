const {ApplicationCommandOptionType} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js');
const comenzarCartasDealer = require('../../blackjackUtils/comenzarCartasDealer.js');
const terminarRonda = require('../../blackjackUtils/terminarRonda.js');

module.exports = {
    name: 'cartas',
    description: 'Indicar la suma de tus cartas',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options:[
        {
            name: "suma",
            description:"suma de tus cartas",
            type: ApplicationCommandOptionType.Integer,
            require: true,
        },
    ],

    callback: (client,interaction) => {
        const cantidadCartas = interaction.options.get('suma').value;
        const idUsuario = interaction.user.id;
        const idCanal = interaction.channel.id;

        if(!blackjackGame.estaJuegoIniciado(idCanal))
        {
            interaction.reply({
                content: "No se ha iniciado ningun juego en este canal",
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

        if(blackjackGame.verEstadoJuego(idCanal) != 2)
        {
            interaction.reply({
                content: "No se está en fase de cartas",
                ephemeral: true,
            });
            return;
        }

        if(blackjackGame.verSiCartas(idUsuario,idCanal))
        {
            interaction.reply({
                content: "Ya has indicado la suma de tus cartas",
                ephemeral: true,
            });
            return;
        }

        
        if(blackjackGame.verFichasJugador(idUsuario,idCanal) === 0)
        {
            interaction.reply({
                content: "Ya has sido eliminado por quedarte sin fichas",
                ephemeral: true,
            });
            return;
        }

        if(cantidadCartas < 2 || cantidadCartas > 100)
        {
            interaction.reply({
                content: "Indicar una suma posible",
                ephemeral: true,
            });
            return;
        }

        if(blackjackGame.esDealer(idUsuario,idCanal))
        {
            if((blackjackGame.verNumeroJugadores(idCanal)-blackjackGame.verCantidadJugadoresCero(idCanal)) === blackjackGame.verNumeroJugadoresCartas(idCanal))
            {
                blackjackGame.indicarCantidadCartasDealer(idCanal,cantidadCartas);
                interaction.reply(`${interaction.user} ha sumado ${cantidadCartas} con sus cartas`);
                terminarRonda(client,idCanal);
            }
            else
            {
                interaction.reply({
                    content: "No han indicado su suma todos los jugadores",
                    ephemeral: true,
                });
            }
            return;
            
        }
        
        blackjackGame.indicarCantidadCartas(idUsuario,idCanal,cantidadCartas);
        
        
        interaction.reply(`${interaction.user} ha sumado ${cantidadCartas} en sus cartas`);
        
        if((blackjackGame.verNumeroJugadores(idCanal)-blackjackGame.verCantidadJugadoresCero(idCanal)) === blackjackGame.verNumeroJugadoresCartas(idCanal))
        {
            comenzarCartasDealer(client,idCanal);
        }
    },
};