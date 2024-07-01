module.exports = async (client,guildId) =>{
    let applicationCommands;

    if (guildId)
    {
        console.log("Revisando comandos de test server");
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    }
    else
    {
        console.log("Revisando comandos globales");
        applicationCommands = await client.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
};