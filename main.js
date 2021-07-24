require("dotenv").config();
const { API, Janru, Categories, Podborki } = require("./helpers/Helper");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const start = async () => {
  try {
    bot.telegram.setMyCommands([
      { command: "/start", description: "Start to use our bot)" },
      { command: "/info", description: "Information about anime bot" },
      { command: "/clear_all", description: "Cler all messages from chat" },
      { command: "/example", description: "Show example of usage" },
      {
        command: "/subscribe",
        description: "Subscribe on the information of the new anime",
      },
      {
        command: "/unsubscribe",
        description: "Unsubscribe from the information of the new anime",
      },
    ]);

    bot.command("/start", (msg) => {
      const id = msg.chat.id;

      bot.telegram.sendMessage(id, "Choose the option in menu", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Все аниме", callback_data: "all_anime" }],
            [{ text: "Категории", callback_data: "categories" }],
            [{ text: "Жанры", callback_data: "janru" }],
            [{ text: "Подборки", callback_data: "groups" }],
            [{ text: "🔍 Поиск по годам", callback_data: "search_for_year" }],
            [
              {
                text: "🔍 Поиск по названию",
                callback_data: "search_for_name",
              },
            ],
          ],
        },
      });

      bot.on("callback_query", async (ctx) => {
        const id = msg.chat.id;
        const text = ctx.update.callback_query.data;
        // const data = msg.message.chat.id;

        switch (text) {
          case "all_anime":
            await new API("https://animang.ru", 130).get_path_anime();
            break;
          case "categories":
            const _categories = new Categories();

            _categories
              .get_categories()
              .then((data) => {
                for (let property of Object.values(data)) {
                  console.log(property);
                }
              })
              .catch((e) => console.log(e));

            msg.telegram.sendMessage(id, "Categories of the anime", {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "🆕 Новинки", callback_data: "new" },
                    { text: "🎥 Фильмы", callback_data: "cinemas" },
                  ],
                  [
                    { text: "📽 Сериалы", callback_data: "serial" },
                    { text: "⏱ Онгоинги", callback_data: "ongoing" },
                  ],
                  [
                    { text: "📺 Тв", callback_data: "tv" },
                    { text: "🎨 Ова", callback_data: "ova" },
                  ],
                  [
                    { text: "🕸 Она", callback_data: "ona" },
                    { text: "📺 Тв-спешл", callback_data: "tv-speshl" },
                  ],
                  [
                    { text: "🗽 Анонсы", callback_data: "anounce" },
                    { text: "🔝 Топ", callback_data: "top" },
                  ],
                  [
                    { text: "📜 Подборки", callback_data: "podborki" },
                    { text: "🍀 Рандомное аниме", callback_data: "random" },
                  ],
                  [{ text: "🔙 Назад", callback_data: "back" }],
                ],
              },
            });
            break;
          case "janru":
            const janru = new Janru();

            janru.get_janru();

            msg.telegram.sendMessage(id, "Types of anime", {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "😂 Комедии", callback_data: "comedy" },
                    { text: "🤖 Меха", callback_data: "mexa" },
                  ],
                  [
                    { text: "🕵️‍♂️ Детективы", callback_data: "detective" },
                    { text: "🎭 Драмы", callback_data: "darama" },
                  ],
                  [
                    { text: "🔮 Мистика", callback_data: "mystique" },
                    { text: "👽 Фантастика", callback_data: "fantastic" },
                  ],
                  [
                    { text: "👹 Фэнтези", callback_data: "fentesi" },
                    { text: "(⓿_⓿) Пародия", callback_data: "parody" },
                  ],
                  [
                    { text: "🌹 Романтика", callback_data: "romantique" },
                    { text: "🎞 Триллеры", callback_data: "triller" },
                  ],
                  [
                    { text: "🎸 Музыка", callback_data: "music" },
                    { text: "☀ Повседневность", callback_data: "everyday" },
                  ],
                  [
                    { text: "👻 Ужасы", callback_data: "uzhasy" },
                    {
                      text: "🗡 Боевые искусства",
                      callback_data: "war_isvustvo",
                    },
                  ],
                  [
                    { text: "🤾‍♂️ Спорт", callback_data: "sport" },
                    { text: "🧕 Исторические", callback_data: "history" },
                  ],
                  [
                    { text: "💏 Этти", callback_data: "etti" },
                    { text: "🏹 Приключения", callback_data: "adventure" },
                  ],
                  [
                    { text: "🎎 Сёдзё", callback_data: "sedze" },
                    { text: "🎴 Сёнен", callback_data: "senen" },
                  ],
                  [{ text: "🔙 Назад", callback_data: "back" }],
                ],
              },
            });
            break;
          case "groups":
            const mix_groups = new Podborki();

            mix_groups.get_mix_groups();

            bot.telegram.sendMessage(id, "Change some group of anime", {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "🎉 Самые популярные аниме",
                      callback_data: "the_most_popular",
                    },
                  ],
                  [
                    {
                      text: "⏳ О путешествиях во времени",
                      callback_data: "time_adventure",
                    },
                  ],
                  [
                    {
                      text: "🎦 Лучшие полнометражные аниме",
                      callback_data: "best_cinema",
                    },
                  ],
                  [
                    {
                      text: "🎌 Аниме с японской мифологии",
                      callback_data: "japan_mifology",
                    },
                  ],
                  [{ text: "🤏 Мини-аниме", callback_data: "mini_anime" }],
                  [
                    {
                      text: "🌌 Аниме про космос",
                      callback_data: "about_space",
                    },
                  ],
                  [{ text: "U+1F1E8 Китайское аниме", callback_data: "china" }],
                  [
                    {
                      text: "⚛ Аниме про акалипсис",
                      callback_data: "apocalypsis",
                    },
                  ],
                  [{ text: "🧝‍♂️🧝‍♀️ Аниме с эльфами", callback_data: "elfs" }],
                  [
                    {
                      text: "🎮 Лучшие аниме по играм",
                      callback_data: "about_games",
                    },
                  ],
                  [
                    {
                      text: "👸 Лучшие фентези-аниме",
                      callback_data: "best_fantasy",
                    },
                  ],
                  [
                    {
                      text: "😹 Лучшие комедийные аниме",
                      callback_data: "best_comedy",
                    },
                  ],
                  [{ text: "🧝‍♂️ Аниме про магию", callback_data: "magic" }],
                  [{ text: "🏫 Аниме про школу", callback_data: "school" }],
                  [
                    {
                      text: "💖 Лучшие аниме о любьви",
                      callback_data: "best_love",
                    },
                  ],
                  [
                    {
                      text: "🧛‍♂️ Аниме про вампиров",
                      callback_data: "wampires",
                    },
                  ],
                  [
                    {
                      text: "🔝 Топ аниме 2019 года",
                      callback_data: "top_2019",
                    },
                  ],
                  [{ text: "👾 Аниме с монстрами", callback_data: "monsters" }],
                  [
                    {
                      text: "😋 Самые кавайные аниме",
                      callback_data: "the_most_kavainy",
                    },
                  ],
                  [
                    {
                      text: "🔝 Лучшие аниме 2018 года",
                      callback_data: "best_2018",
                    },
                  ],
                  [{ text: "🔙 Назад", callback_data: "back" }],
                ],
              },
            });
            break;
          case "search_for_year":
            msg.telegram.sendMessage(id, "Search for year (from 1997 y.)");
            break;
          case "search_for_name":
            msg.telegram.sendMessage(id, "Search for name");
            break;
        }
      });
    });

    bot.command("/info", (msg) => {
      msg.telegram.sendMessage(
        msg.chat.id,
        "This bot can search anime and you can find anime under mix groups, janres, categories and other"
      );
    });

    bot.command("/clear_all", (msg) => {
      msg.telegram.deleteMessage(msg.chat.id, msg.message.message_id - 1); //Fix later
    });

    bot.command("/subscribe", (msg) => {
      msg.telegram.sendMessage(
        msg.chat.id,
        "Choose category, which you can listen in real time"
      );
    });

    bot.command("/unsubscribe", (msg) => {
      msg.telegram.sendMessage(msg.chat.id, "Unsubscribe from category");
    });

    bot.launch();
  } catch (e) {
    console.log(e);
  }
};

start();
