const TelegramBot = require('node-telegram-bot-api');

// Substitua pelo seu token do Bot
const token = 'SEU_TOKEN_AQUI';

// Crie uma instância do bot
const bot = new TelegramBot(token, {polling: true});

// Quando o comando '/start' for enviado
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Enviar a mensagem com o nome estilizado
  bot.sendMessage(chatId, "<b>Botzin Banidor VIP</b>\n\nBem-vindo ao Bot que pode banir e desbanir números!\n", {
    parse_mode: "HTML"
  });

  // Enviar o menu com opções
  const menu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Banir por Spam", callback_data: 'ban_spam' }],
        [{ text: "Desbanir", callback_data: 'desbanir' }],
        [{ text: "Gerar Número", callback_data: 'gerar_numero' }],
      ]
    }
  };

  bot.sendMessage(chatId, "Escolha uma das opções abaixo:", menu);

  // Mensagem de créditos no final
  bot.sendMessage(chatId, "\nCriado por: @Anonimusofc", {
    parse_mode: "Markdown"
  });
});

// Respostas do menu (botão inline)
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;

  // Ação para o botão de Banir por Spam
  if (callbackQuery.data === 'ban_spam') {
    bot.sendMessage(chatId, "Você escolheu a opção: Banir por Spam. Em breve, insira o número para banir.");
  }

  // Ação para o botão de Desbanir
  if (callbackQuery.data === 'desbanir') {
    bot.sendMessage(chatId, "Você escolheu a opção: Desbanir. Em breve, insira o número para desbanir.");
  }

  // Ação para o botão de Gerar Número
  if (callbackQuery.data === 'gerar_numero') {
    bot.sendMessage(chatId, "Você escolheu a opção: Gerar Número. Gerando um novo número...");
  }
});
