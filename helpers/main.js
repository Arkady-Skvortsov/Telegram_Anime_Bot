// require("dotenv").config();
const cheerio = require("cheerio");
const TelegramBot = require("node-telegram-bot-api");
const { api } = require("./Helper");

const bot = new TelegramBot(process.env.BOT_TOKEN);

async function start() {
  bot.setMyCommands([
    { command: "/start", description: "Start using anime bot" },
    { command: "/info", description: "Information about bot skills" },
    { command: "/example", description: "Show me example of bot usage" },
    { command: "/del_last", description: "Delete last message in chat" },
    { command: "/del_all", description: "Clear all chat with bot" },
    {
      command: "/subscribe",
      description: "Subscribe on the new anime notifications",
    },
    {
      command: "/unsubscribe",
      description: "Unsubscribe from the new anime notifications",
    },
  ]);

  bot.on("message", (msg) => {
    const id = msg.chat.id;

    bot.sendSticker(
      id,
      "https://cdn.tlgrm.ru/stickers/470/ada/470ada64-6288-316d-95b6-c84695ff0f18/192/7.webp"
    );

    // bot.sendMessage(
    // id,
    // "Hello). Here is some commands",
    // {
    //   reply_markup: {
    //     inline_keyboard: [
    //     [{text: "Категории", callback_data="1"}],
    //     [{text: "Жанры", callback_data="2"}],
    //     [{text: "Случайное аниме", callback_data="3"}],
    //     [{text: "Поиск по годам", callback_data="4"}],
    //     [{text: "Поиск по названию", callback_data="5"}]
    //     ]
    //   }
    // })
  });
}

start();
