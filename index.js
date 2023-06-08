const { Telegraf } = require('telegraf');
const moment = require('moment-timezone');
const axios = require('axios');

// Crea una nueva instancia del bot de Telegram
const bot = new Telegraf('5600751627:AAEhedOrcXeU1rZAzHyI6LcjMVUM5ep1Jck');

const yourChatId = '1462919343';


const timezone = 'America/Argentina/Buenos_Aires';

const hour = 12;
const minute = 15;

async function fetchAPIAndBuildMessage() {
    try {
      // Realiza la solicitud HTTP a la API
      const response = await axios.get('https://api-cambio-py-ars.onrender.com/');
  
      // Extrae los datos relevantes de la respuesta de la API
      const data = response.data;
      const c = response.data.apirect
     

     
  
      // Construye el mensaje utilizando los datos obtenidos
      message = `[+]===== CAMBIO PY =====[+]\n\nMONEDA: ${c.MONEDA}\nCOMPRA: ${c.COMPRA}\nVENTA: ${c.VENTA}\nFECHA: ${c.F}`;
  
      // Envía el mensaje a tu chat personal
      bot.telegram.sendMessage(yourChatId, message);
    } catch (error) {
      console.error('Error al consumir la API:', error);
    }
  }
  
  // Función para enviar el mensaje diario
  function sendDailyMessage() {
    // Obtén la fecha y hora actual en la zona horaria de Argentina
    const now = moment().tz(timezone);
    const currentHour = now.hours();
    const currentMinute = now.minutes();
  
    // Verifica si la hora actual coincide con la hora y los minutos especificados
    if (currentHour === hour && currentMinute === minute) {
      // Realiza la solicitud a la API y construye el mensaje
      fetchAPIAndBuildMessage();
    }
  }
  
  // Ejecuta la función sendDailyMessage() cada minuto para verificar si se debe enviar el mensaje
  setInterval(sendDailyMessage, 60000);
  
  // Inicia el bot
  bot.launch();