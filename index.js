const { Telegraf } = require('telegraf');
const moment = require('moment-timezone');
const axios = require('axios');


const bot = new Telegraf('5600751627:AAEhedOrcXeU1rZAzHyI6LcjMVUM5ep1Jck');

const yourChatId = '1462919343';


const timezone = 'America/Argentina/Buenos_Aires';

const hour = 12;
const minute = 30;

async function fetchAPIAndBuildMessage() {
    try {
    
      const response = await axios.get('https://api-cambio-py-ars.onrender.com/');
  
      const data = response.data;
      const c = response.data.apirect
     

     
  
  
      message = `[+]===== CAMBIO PY =====[+]\n\nMONEDA: ${c.MONEDA}\nCOMPRA: ${c.COMPRA}\nVENTA: ${c.VENTA}\nFECHA: ${c.F}`;
  
     
      bot.telegram.sendMessage(yourChatId, message);
    } catch (error) {
      console.error('Error al consumir la API:', error);
    }
  }
  
 
  function sendDailyMessage() {
   
    const now = moment().tz(timezone);
    const currentHour = now.hours();
    const currentMinute = now.minutes();
  
  
    if (currentHour === hour && currentMinute === minute) {
      
      fetchAPIAndBuildMessage();
    }
  }
  
  // Ejecuta la función sendDailyMessage() cada minuto para verificar si se debe enviar el mensaje
  setInterval(sendDailyMessage, 60000);
  
  // Inicia el bot
  bot.launch();