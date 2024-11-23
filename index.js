// index.js

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Substitua pelo token do seu bot
const token = process.env.TELEGRAM_BOT_TOKEN; // O token do bot será obtido como variável de ambiente
const bot = new TelegramBot(token, { polling: true });

// Lista de números banidos
let bannedNumbers = [];

// Comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const response = `
Bem-vindo! Eu sou o seu bot de gerenciamento de banimento e desbanimento. Escolha uma das opções abaixo:

1. /banir <número> - Banir um número
2. /desbanir <número> - Desbanir um número
`;
  bot.sendMessage(chatId, response);
});

// Comando para banir número
bot.onText(/\/banir (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const numberToBan = match[1];  // O número que foi enviado após o comando

  // Verifica se o número já está banido
  if (bannedNumbers.includes(numberToBan)) {
    bot.sendMessage(chatId, `O número ${numberToBan} já está banido.`);
    return;
  }

  // Adiciona o número à lista de banidos
  bannedNumbers.push(numberToBan);
  fs.writeFileSync('bannedNumbers.json', JSON.stringify(bannedNumbers)); // Salva no arquivo

  bot.sendMessage(chatId, `O número ${numberToBan} foi banido com sucesso.`);
});

// Comando para desbanir número
bot.onText(/\/desbanir (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const numberToUnban = match[1];  // O número a ser desbanido

  // Verifica se o número está na lista de banidos
  if (!bannedNumbers.includes(numberToUnban)) {
    bot.sendMessage(chatId, `O número ${numberToUnban} não está banido.`);
    return;
  }

  // Remove o número da lista de banidos
  bannedNumbers = bannedNumbers.filter(number => number !== numberToUnban);
  fs.writeFileSync('bannedNumbers.json', JSON.stringify(bannedNumbers)); // Atualiza o arquivo

  bot.sendMessage(chatId, `O número ${numberToUnban} foi desbanido com sucesso.`);
});

// Carrega a lista de números banidos do arquivo
if (fs.existsSync('bannedNumbers.json')) {
  bannedNumbers = JSON.parse(fs.readFileSync('bannedNumbers.json', 'utf-8'));
}

// Resposta padrão para mensagens não reconhecidas
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(chatId, 'Comando não reconhecido. Tente novamente.');
  }
});
