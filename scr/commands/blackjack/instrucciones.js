const {ApplicationCommandOptionType,EmbedBuilder} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js');

module.exports = {
    name: 'instruncciones',
    description: 'Ver instrucciones de juego',
    //devOnly: Boolean,

    callback: (client,interaction) => {

        const idUsuario = interaction.user.id;
        const idCanal = interaction.channel.id;
        
        if(blackjackGame.estaJuegoIniciado(idCanal))
        {
            //interaction.reply("Ya se ha iniciado un juego");
            interaction.reply({
                content: "No se pueden ver las instrucciones durante una partida",
                ephemeral: true,
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("Instrucciones")
            .setDescription(`- **/jugar** Inicia una partida de blackjack. Quien lo utiliza se convierte en el dealer\n
- **/unirse** Entrar a la partida como jugador\n
- **/comenzar [cantidad-inicial]** Exclusivo para el dealer. Comienza la partida con los jugadores actuales. Opcional: Indicar cantidad inicial de fichas\n
- **/apostar [cantidad-fichas]** Indicar la cantidad de fichas a apostar en la ronda\n
- **/cartas [suma]** Indicar la suma de tus cartas\n
Una vez todos hayan indicado la suma de sus cartas, el dealer indica la suya. Se calculará el resultado de las apuestas y terminará la ronda\n
Una nueva ronda comenzará automáticamente. El dealer puede utilizar **/terminar** para acabar la partida`)
            .setColor('Red');

        interaction.reply({embeds:[embed]});
    },
};