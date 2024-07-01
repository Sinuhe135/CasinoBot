# CasinoBot
Bot de Discord para la administración de fichas en un juego de blackjack. Hecho en nodejs con Discord.js 

**Link de invitacion:** https://discord.com/oauth2/authorize?client_id=1232238944117198918&permissions=2147494912&integration_type=0&scope=bot+applications.commands

## Comandos
- **/jugar** Inicia una partida de blackjack. Quien lo utiliza se convierte en el dealer

- **/unirse** Entrar a la partida como jugador

- **/comenzar** [cantidad-inicial] Exclusivo para el dealer. Comienza la partida con los jugadores actuales. Opcional: Indicar cantidad inicial de fichas

- **/apostar** [cantidad-fichas] Indicar la cantidad de fichas a apostar en la ronda

- **/cartas [suma]** Indicar la suma de tus cartas

Una vez todos hayan indicado la suma de sus cartas, el dealer indica la suya. Se calculará el resultado de las apuestas y terminará la ronda

Una nueva ronda comenzará automáticamente. El dealer puede utilizar **/terminar** para acabar la partida
