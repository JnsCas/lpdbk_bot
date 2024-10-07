const {randomNumberRange} = require("../util/randomNumber");
const CronJob = require('cron').CronJob;

const EVERY_DAT_AT_10_AM = '0 10 * * *';

const messagesFede = [
  "¡@Fedepineiro89, aparecé, pibe! El grupo no es lo mismo sin vos, ¿entendés? 🔥",
  "¿Dónde está el campeón, @Fedepineiro89? ¡Te necesitamos acá, papá! 😎",
  "¡@Fedepineiro89, la gente pregunta por vos…! ¿Qué pasa, te hacés el vivo? 🤔",
  "¡@Fedepineiro89, no me jodas! El grupo está muy callado sin tus comentarios, eh 💬",
  "@Fedepineiro89, ¿hoy será el día que aparezcás, papá? ¡Todos te estamos esperando, eh! 🚀",
  "El grupo extraña tus aportes, @Fedepineiro89. ¡Venite ya, loco, no seas botón! 👀",
  "Dale, @Fedepineiro89, no seas fantasma, pibe. ¡Manifestate, papá! 👻",
  "¡@Fedepineiro89, aparecé y contanos qué andás haciendo, maestro! 🔥",
  "@Fedepineiro89, el chat se siente incompleto sin vos. ¡Sumate, nene! 🤗",
  "Cada día que @Fedepineiro89 no se conecta, un hincha pierde una lágrima 😢",
  "@Fedepineiro89, ¡te perdiste algo épico en el chat hoy, hermano! ¿A qué hora aparecés, campeón? ⏰",
  "¡@Fedepineiro89, venite que se viene un debate que ni el Diego se quiere perder! 💡",
  "El contador de días sin @Fedepineiro89 va subiendo. ¡No puede ser, che! 📅",
  "¿Será hoy el gran regreso de @Fedepineiro89? ¡El suspenso nos está matando, papá! 🥺",
  "¡@Fedepineiro89, no te hagás rogar más, fenómeno! ¡Te esperamos con ganas, eh! 💪",
  "Sin @Fedepineiro89 el grupo está incompleto, loco. ¡Hacete presente ya! 🌟",
  "@Fedepineiro89, te necesitamos para ponerle onda a esto, ¡no nos falles, campeón! 💥",
  "¡No te escondás, @Fedepineiro89! Hoy es el día para volver al ruedo, hermano 😏",
  "Si @Fedepineiro89 no aparece en 5 minutos, ¡todos a mandarle stickers! Así no se puede, nene 😜",
  "@Fedepineiro89, ¡ya te extraño! ¿Dónde te metiste, papá? 🤨",
  "¡@Fedepineiro89, dejate de joder y aparecé ya, monstruo! 🔥",
  "Oye @Fedepineiro89, ¿cuándo vas a dar señales de vida, eh? El grupo te necesita, campeón 💬",
  "@Fedepineiro89, cada día que no aparecés, un golazo se queda sin su aplauso 😂",
  "@Fedepineiro89, ¿tenés la capa de invisibilidad puesta? ¡Venite al grupo, nene! 🦸‍♂️",
  "¿Acaso @Fedepineiro89 se fue de vacaciones y no avisó? ¡Esto es un quilombo! 🏝️",
  "@Fedepineiro89, aparecé que necesitamos un poco de humor en este chat, pibe 😜",
  "¿@Fedepineiro89 sigue en el grupo? ¡Dame una señal de vida, fenómeno! 🙋‍♂️",
  "Si @Fedepineiro89 no aparece hoy, ¡organizamos una búsqueda y le caemos a la casa! 🔍",
  "@Fedepineiro89, no seas tímido, ¡el grupo está esperándote con ansias, campeón! 🤗",
  "¿Qué hacés, @Fedepineiro89? ¡Aparecé y contanos algo nuevo, pibe! 🔥",
  "¡El grupo no tiene la misma chispa sin @Fedepineiro89, che! 💥",
  "Hey @Fedepineiro89, tu asiento en el chat sigue vacío, papá. ¡Venite! ✨",
  "@Fedepineiro89, si no venís hoy, ¡todos mandamos gifs de tu ausencia, loco! 😂",
  "¡Te estamos esperando, @Fedepineiro89! Dale, no te escondas más 😎",
  "Cada vez que @Fedepineiro89 no aparece, el grupo pierde un punto de diversión 💥",
  "¡Hoy sí es el día, @Fedepineiro89! Todos confiamos en vos para levantar el grupo, nene 😄",
  "@Fedepineiro89, ¡tenés la responsabilidad de darle vida a este chat! ¡Aparecé ya, campeón! 💪",
  "Si @Fedepineiro89 no contesta en 10 minutos, ¡todos le mandamos emojis tristes! 😢",
  "¡Dale @Fedepineiro89! Ya no tenés excusa para no estar con nosotros hoy 👀",
  "¡@Fedepineiro89, dale color al chat! ¡Te extrañamos por acá, fenómeno! 🎨"
];

module.exports = (bot) => {
  const job = new CronJob(EVERY_DAT_AT_10_AM, function() {
    const randomIndex = randomNumberRange(0, messagesFede.length)
    bot.telegram.sendMessage(process.env.CHAT_ID, messagesFede[randomIndex]);
  }, null, true, 'America/Argentina/Buenos_Aires');
  job.start();
}