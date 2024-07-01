const {ApplicationCommandOptionType} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js')
const comenzarRonda = require('../../blackjackUtils/comenzarRonda.js')

module.exports = {
    name: 'comenzar',
    description: 'Comenzar partida de blackjack con los jugadores actuales',
    //devOnly: Boolean,
    options:[
        {
            name: "fichas-iniciales",
            description:"cantidad de fichas",
            type: ApplicationCommandOptionType.Integer,
            require: false,
        },
    ],

    callback: (client,interaction) => {
        let numeroFichas = 0;
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

        if(blackjackGame.verEstadoJuego(idCanal) != 0)
        {
            interaction.reply({
                content: "La partida ya ha comenzado",
                ephemeral: true,
            });
            return;
        }

        if(!blackjackGame.esDealer(idUsuario, idCanal))
        {
            interaction.reply({
                content: "Solo el dealer puede comenzar la partida",
                ephemeral: true,
            });
            return;
        }
        
        if(blackjackGame.verNumeroJugadores(idCanal) <= 0)
        {
            //interaction.reply("Solo el dealer puede terminar la partida");
            interaction.reply({
                content: "Se necesita al menos un jugador",
                ephemeral: true,
            });
            return;
        }
            
        if(interaction.options.get('fichas-iniciales'))
        {
            numeroFichas = interaction.options.get('fichas-iniciales').value;
            if(numeroFichas <=0)
            {
                interaction.reply({
                    content: "El numero inicial de fichas debe ser mayor a 0",
                    ephemeral: true,
                });
                return;
            }
            else if(numeroFichas >1000001)
            {
                interaction.reply({
                    content: "El numero inicial de fichas no puede ser mayor a 1 000 000",
                    ephemeral: true,
                });
                return;
            }
        }

        blackjackGame.comenzarJuego(idCanal, numeroFichas);
        
        if(numeroFichas === 0)
            interaction.reply(`${interaction.user} ha comenzado la partida con **100** fichas para cada jugador`);
        else
            interaction.reply(`${interaction.user} ha comenzado la partida con **${numeroFichas}** fichas para cada jugador`);

        comenzarRonda(client,idCanal);

        },
    };