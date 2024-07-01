const {devs,testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client,interaction) => {
    if(!interaction.isChatInputCommand()) return;
    
    const localCommands = getLocalCommands();
    
    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        if(!commandObject) return;

        if(commandObject.devOnly)
        {
            if(!devs.includes(interaction.member.id))
            {
                interaction.reply({
                    content: "Solo los desarrolladores pueden ejecutar este comando",
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.testOnly)
        {
            if(!(interaction.guild.id===testServer))
            {
                interaction.reply({
                    content: "No se puede ejecutar este comando aqui",
                    ephemeral: true,
                });
                return;
            }
        }

        await commandObject.callback(client,interaction);

    } catch (error) {
        console.log("Hubo un error al ejecutar el comando\n"+error)
    }

}