const blackjackGame = require('./blackjack.js');
const {EmbedBuilder} = require('discord.js');

module.exports =  (client,idCanal) =>{
    const canal = client.channels.cache.get(idCanal);
    //let idMayorApuesta;
    //let fichasMayorApuesta=0;

    setTimeout(() => {
        /*
        for(const idUsuario in blackjackGame.verApuestasCanal(idCanal))
        {
            if(blackjackGame.verApuestasCanal(idCanal)[idUsuario] > fichasMayorApuesta)
            {
                idMayorApuesta = idUsuario;
                fichasMayorApuesta = blackjackGame.verApuestasCanal(idCanal)[idUsuario];
            }
        }
        */

        blackjackGame.cambiarEstadoJuego(idCanal,2);
        const embed = new EmbedBuilder()
            .setTitle(`Tirar cartas`)
            .setDescription(`Todos los jugadores han apostado\n\nUtilizar /cartas para indicar la suma de tus cartas`)
            .setColor('Red');

        canal.send({embeds:[embed]});

    },2000);
};