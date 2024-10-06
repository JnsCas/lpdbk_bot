const {randomNumberRange} = require("../util/randomNumber");
const CronJob = require('cron').CronJob;

const EVERY_DAT_AT_10_AM = '0 10 * * *';

const messagesFede = [
  "¡@Fedepineiro89, aparecé! El grupo no es lo mismo sin vos 🔥",
  "¿Dónde está el gran @Fedepineiro89? ¡Te necesitamos acá! 😎",
  "@Fedepineiro89, la gente pregunta por vos… ¿te vas a hacer rogar? 🤔",
  "¡@Fedepineiro89, el grupo está muy callado sin tus comentarios! 💬",
  "@Fedepineiro89, ¿hoy será el día que aparezcas? ¡Estamos todos esperándote! 🚀",
  "El grupo extraña tus aportes, @Fedepineiro89. ¡Venite ya! 👀",
  "Dale, @Fedepineiro89, no seas fantasma. ¡Manifiestate! 👻",
  "¡@Fedepineiro89, aparecé y contanos qué andás haciendo! 🔥",
  "@Fedepineiro89, el chat se siente incompleto sin tu presencia. ¡Sumate! 🤗",
  "Cada día que @Fedepineiro89 no se conecta, un admin pierde una lágrima 😢",
  "@Fedepineiro89, te perdiste algo épico en el chat hoy. ¿A qué hora apareces? ⏰",
  "¡@Fedepineiro89, andá apareciendo que se viene debate interesante! 💡",
  "El contador de días sin @Fedepineiro89 va subiendo. ¡No puede ser! 📅",
  "¿Será hoy el gran regreso de @Fedepineiro89? ¡El suspenso nos está matando! 🥺",
  "¡@Fedepineiro89, no te hagas rogar más! ¡Te esperamos con ganas! 💪",
  "Sin @Fedepineiro89 el grupo está incompleto. ¡Hacete presente! 🌟",
  "@Fedepineiro89, te necesitamos para ponerle onda a esto. ¡No nos falles! 💥",
  "¡No te escondas, @Fedepineiro89! Hoy es el día para volver al ruedo. 😏",
  "Si @Fedepineiro89 no aparece en 5 minutos, ¡todos a mandarle stickers! 😜",
  "@Fedepineiro89, ¡ya te extraño! ¿Dónde te metiste? 🤨",
  "¡@Fedepineiro89, no te hagas esperar más! Queremos verte por acá 🔥",
  "Oye @Fedepineiro89, ¿cuándo vas a dar señales de vida? El grupo te necesita 💬",
  "@Fedepineiro89, cada día que no apareces, un meme se queda sin su risa 😂",
  "@Fedepineiro89, ¿tenés la capa de invisibilidad puesta? ¡Venite al grupo! 🦸‍♂️",
  "¿Acaso @Fedepineiro89 se fue de vacaciones y no nos avisó? 🏝️",
  "@Fedepineiro89, aparecé que necesitamos un poco de humor en este chat 😜",
  "¿@Fedepineiro89 sigue en el grupo? ¡Dame una señal de vida! 🙋‍♂️",
  "Si @Fedepineiro89 no aparece hoy, ¡organizamos una búsqueda virtual! 🔍",
  "@Fedepineiro89, no seas tímido, ¡el grupo está esperándote con ansias! 🤗",
  "¿Qué hacés, @Fedepineiro89? Aparecé y contanos algo nuevo! 🔥",
  "¡El grupo no tiene la misma chispa sin @Fedepineiro89! 💥",
  "Hey @Fedepineiro89, tu asiento en el chat sigue vacío. ¡Venite! ✨",
  "@Fedepineiro89, si no vienes hoy, ¡todos mandamos gifs de tu ausencia! 😂",
  "¡Te estamos esperando, @Fedepineiro89! Dale, no te escondas. 😎",
  "Cada vez que @Fedepineiro89 no aparece, el grupo pierde un punto de diversión 💥",
  "¡Hoy sí es el día, @Fedepineiro89! Todos confiamos en vos para animar el grupo 😄",
  "@Fedepineiro89, tenés la responsabilidad de levantar este chat. ¡Aparecé! 💪",
  "Si @Fedepineiro89 no contesta en 10 minutos, ¡todos le mandamos emojis tristes! 😢",
  "¡Dale @Fedepineiro89! Ya no tenés excusa para no estar con nosotros hoy 👀",
  "¡@Fedepineiro89, dale color al chat! ¡Te extrañamos por acá! 🎨"
];

module.exports = (bot) => {
  const job = new CronJob(EVERY_DAT_AT_10_AM, function() {
    const randomIndex = randomNumberRange(0, messagesFede.length)
    bot.telegram.sendMessage(process.env.CHAT_ID, messagesFede[randomIndex]);
  }, null, true, 'America/Argentina/Buenos_Aires');
  job.start();
}