const blackjackGame = require('./blackjack.js');
const comenzarRonda = require('./comenzarRonda.js');
const {EmbedBuilder} = require('discord.js');

module.exports =  (client,idCanal) =>{
    const canal = client.channels.cache.get(idCanal);
    let texto = ``;
    let ganancias = 0;
    let usuarios = [];
    let fichas = [];

    setTimeout(() => {
        for(const idUsuario in blackjackGame.verApuestasCanal(idCanal))
        {
            if(blackjackGame.verCantidadCartasCanal(idCanal)[idUsuario] > 21)
            {
                blackjackGame.ananirFichas(idUsuario,idCanal,-blackjackGame.verApuestasCanal(idCanal)[idUsuario]);
                ganancias+=blackjackGame.verApuestasCanal(idCanal)[idUsuario];
                texto+=(`<@${idUsuario}> ha perdido. **-${blackjackGame.verApuestasCanal(idCanal)[idUsuario]}** fichas\n`);
                continue;
            }

            if(blackjackGame.verCantidadCartasDealer(idCanal) > 21)
            {
                blackjackGame.ananirFichas(idUsuario,idCanal,blackjackGame.verApuestasCanal(idCanal)[idUsuario]);
                ganancias-=blackjackGame.verApuestasCanal(idCanal)[idUsuario];
                texto+=(`<@${idUsuario}> ha ganado. **+${blackjackGame.verApuestasCanal(idCanal)[idUsuario]}** fichas\n`);
                continue;
            }

            if(blackjackGame.verCantidadCartasCanal(idCanal)[idUsuario] > blackjackGame.verCantidadCartasDealer(idCanal))
            {
                blackjackGame.ananirFichas(idUsuario,idCanal,blackjackGame.verApuestasCanal(idCanal)[idUsuario]);
                ganancias-=blackjackGame.verApuestasCanal(idCanal)[idUsuario];
                texto+=(`<@${idUsuario}> ha ganado. **+${blackjackGame.verApuestasCanal(idCanal)[idUsuario]}** fichas\n`);
            }
            else if(blackjackGame.verCantidadCartasCanal(idCanal)[idUsuario] < blackjackGame.verCantidadCartasDealer(idCanal))
            {
                blackjackGame.ananirFichas(idUsuario,idCanal,-blackjackGame.verApuestasCanal(idCanal)[idUsuario]);
                ganancias+=blackjackGame.verApuestasCanal(idCanal)[idUsuario];
                texto+=(`<@${idUsuario}> ha perdido. **-${blackjackGame.verApuestasCanal(idCanal)[idUsuario]}** fichas\n`);
            }
            else
            {
                texto+=(`<@${idUsuario}> ha empatado\n`);
            }
        }

        let embed = new EmbedBuilder()
            .setTitle(`Resultados`)
            .setDescription(texto)
            .setColor('Yellow');

        canal.send({embeds:[embed]});

        for(const idUsuario in blackjackGame.verFichasCanal(idCanal))
        {
            usuarios.push(idUsuario);
            fichas.push(blackjackGame.verFichasJugador(idUsuario,idCanal));
        }

        let ordenado = false;
        let bubble = 0;

        while(!ordenado)
        {
            ordenado = true;
            texto = ``;
            for (let i = 0; i < fichas.length; i++)
            {
                texto+=`${i}. <@${usuarios[i]}>: ${blackjackGame.verFichasJugador(usuarios[i],idCanal)} fichas\n`;
                if(fichas[i] < fichas[i+1])
                {
                    bubble = fichas[i];
                    fichas[i] = fichas[i+1];
                    fichas[i+1] = bubble;
    
                    bubble = usuarios[i];
                    usuarios[i] = usuarios[i+1];
                    usuarios[i+1] = bubble;
    
                    ordenado = false;
                }
            }
        }

        blackjackGame.ananirGananciasDealer(idCanal,ganancias);
        texto+=`\nLas ganancias de <@${blackjackGame.verDealer(idCanal)}> son de **${blackjackGame.verGananciasDealer(idCanal)}** fichas`;

        embed = new EmbedBuilder()
        .setTitle(`Posiciones`)
        .setDescription(texto)
        .setColor('Green');

        canal.send({embeds:[embed]});

        if(blackjackGame.verNumeroJugadores(idCanal) === blackjackGame.verCantidadJugadoresCero(idCanal))
        {
            blackjackGame.terminarJuego(idCanal);
            canal.send("Todos los jugadores se han quedado sin fichas\n\nPartida terminada. Gracias por jugar");
            return;
        }

        blackjackGame.reiniciarRonda(idCanal);
        blackjackGame.cambiarEstadoJuego(idCanal,1);
        comenzarRonda(client,idCanal);
        
    },2000);
};