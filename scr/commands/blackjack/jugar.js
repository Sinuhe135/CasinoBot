const {ApplicationCommandOptionType,EmbedBuilder} = require('discord.js');
const blackjackGame = require('../../blackjackUtils/blackjack.js');

module.exports = {
    name: 'jugar',
    description: 'Iniciar blackjack',
    //devOnly: Boolean,

    callback: (client,interaction) => {

        const idUsuario = interaction.user.id;
        const idCanal = interaction.channel.id;
        
        if(blackjackGame.estaJuegoIniciado(idCanal))
        {
            //interaction.reply("Ya se ha iniciado un juego");
            interaction.reply({
                content: "Ya se ha iniciado un juego",
                ephemeral: true,
            });
            return;
        }
        
        blackjackGame.iniciarJuego(idUsuario,idCanal);

        const embed = new EmbedBuilder()
            .setTitle("Juego iniciado")
            .setDescription(`Se ha iniciado un juego de blackjack\n${interaction.user} es el dealer\n\nUtilizar /unirse para entrar\nUtilizar /comenzar para empezar el juego`)
            .setColor('DarkGreen');

        interaction.reply({embeds:[embed]});
    },
};