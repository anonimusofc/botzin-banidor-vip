const TelegramBot = require('node-telegram-bot-api');

// Token do seu bot
const token = '7977421119:AAH5PkWqTt0hgMUeSbXLY4kg-AklDaXcvsc';
const bot = new TelegramBot(token, { polling: true });

// Lista de números banidos
let bannedNumbers = [];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Envia a mensagem de boas-vindas com o menu de opções
  bot.sendMessage(chatId, `
    Olá, sou o **Botzin Banidor Vip** 👋
    Escolha uma das opções abaixo:
    1️⃣ /banir <número> - Banir um número
    2️⃣ /desbanir <número> - Desbanir um número
    3️⃣ /listar_banidos - Listar números banidos
    4️⃣ /ajuda - Como usar o bot

    Criado por: @Anonimusofc
    Bot: @botizinbanidorvipbot
  `, { parse_mode: 'Markdown' });
});

// Comando para banir número
bot.onText(/\/banir (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const numberToBan = match[1];

  // Verifica se o número já está banido
  if (bannedNumbers.includes(numberToBan)) {
    bot.sendMessage(chatId, `O número ${numberToBan} já está banido.`);
  } else {
    bannedNumbers.push(numberToBan);
    bot.sendMessage(chatId, `Número ${numberToBan} foi banido com sucesso!`);
  }
});

// Comando para desbanir número
bot.onText(/\/desbanir (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const numberToUnban = match[1];

  // Verifica se o número está banido
  if (bannedNumbers.includes(numberToUnban)) {
    bannedNumbers = bannedNumbers.filter((num) => num !== numberToUnban);
    bot.sendMessage(chatId, `Número ${numberToUnban} foi desbanido com sucesso!`);
  } else {
    bot.sendMessage(chatId, `O número ${numberToUnban} não está na lista de banidos.`);
  }
});

// Comando para listar os números banidos
bot.onText(/\/listar_banidos/, (msg) => {
  const chatId = msg.chat.id;

  if (bannedNumbers.length === 0) {
    bot.sendMessage(chatId, 'Não há números banidos no momento.');
  } else {
    bot.sendMessage(chatId, `Números banidos: \n${bannedNumbers.join('\n')}`);
  }
});

// Comando para exibir ajuda
bot.onText(/\/ajuda/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
    Comandos disponíveis:
    /banir <número> - Banir um número
    /desbanir <número> - Desbanir um número
    /listar_banidos - Ver números banidos
    /ajuda - Exibir essa mensagem de ajuda

    Criado por: @Anonimusofc
    Bot: @botizinbanidorvipbot
  `);
});
