const blackjackGame = require('../../blackjackUtils/blackjack.js');

module.exports =(client) =>{
    const limiteInactividad = 10*(60*1000); //primer numero son minutos
    const intervalo = 60*(1000); //primer numero son segundos
    
    let canal;
    let now;

    setInterval(() => {
        now = Date.now();
        for (const idCanal in blackjackGame.verUltimaInteraccion()) {
            if (now - blackjackGame.verUltimaInteraccion()[idCanal] > limiteInactividad) {
                canal = client.channels.cache.get(idCanal);
                canal.send("*Partida terminada por inactividad*");
                blackjackGame.terminarJuego(idCanal);
            }
        }
    }, intervalo);
};