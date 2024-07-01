require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name:'apostar',
        description:'apostar fichas',
        options: [
            {
                name: "fichas",
                description:"cantidad de fichas",
                type: ApplicationCommandOptionType.Integer,
                require: true,
            },
        ],
    },
    {
        name:'puntuaciones',
        description:"ver fichas de jugadores"
    },
];

const rest = new REST ({version:'10'}).setToken(process.env.TOKEN);

(async () =>{
    try
    {
        console.log("Registrando comandos");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            {body: commands}
        )
        console.log("Comandos registrados");
    }
    catch(error)
    {
        console.log(error);
    }
})();