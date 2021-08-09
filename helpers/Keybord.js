const Keyboard = function () {};

Keyboard.prototype.render_main = function () {
  return {
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
  };
};

Keyboard.prototype.render_category = function () {
  return {
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
  };
};

Keyboard.prototype.render_janru = function () {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "😂 Комедии", callback_data: "komediya" },
          { text: "🤖 Меха", callback_data: "mexa" },
        ],
        [
          { text: "🕵️‍♂️ Детективы", callback_data: "detektiv" },
          { text: "🎭 Драмы", callback_data: "drama" },
        ],
        [
          { text: "🔮 Мистика", callback_data: "mistika" },
          { text: "👽 Фантастика", callback_data: "fantastika" },
        ],
        [
          { text: "👹 Фэнтези", callback_data: "fentezi" },
          { text: "(⓿_⓿) Пародия", callback_data: "parodiya" },
        ],
        [
          { text: "🌹 Романтика", callback_data: "romantika" },
          { text: "🎞 Триллеры", callback_data: "triller" },
        ],
        [
          { text: "🎸 Музыка", callback_data: "muzyka" },
          { text: "☀ Повседневность", callback_data: "povsednevnost" },
        ],
        [
          { text: "👻 Ужасы", callback_data: "uzhasy" },
          {
            text: "🗡 Боевые искусства",
            callback_data: "boevye-iskusstva",
          },
        ],
        [
          { text: "🤾‍♂️ Спорт", callback_data: "sport" },
          { text: "🧕 Исторические", callback_data: "istoricheskij" },
        ],
        [
          { text: "💏 Этти", callback_data: "etti" },
          { text: "🏹 Приключения", callback_data: "priklyuchenia" },
        ],
        [
          { text: "🎎 Сёдзё", callback_data: "syodzyo" },
          { text: "🎴 Сёнен", callback_data: "syonen" },
        ],
        [{ text: "🔙 Назад", callback_data: "back" }],
      ],
    },
  };
};

Keyboard.prototype.render_anime_buttons = function () {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Подробная информация",
            callback_data: "current_information",
          },
        ],
        [{ text: "Описание", callback_data: "description" }],
        [{ text: "Отзывы", callback_data: "responses" }],
        [{ text: "Аннотации на фильмы", callback_data: "annotations" }],
        [{ text: "🔙 Назад", callback_data: "back" }],
      ],
    },
  };
};

Keyboard.prototype.render_back_button = function () {
  return {
    reply_markup: {
      inline_keyboard: [[{ text: "🔙 Назад", callback_data: "back" }]],
    },
  };
};

Keyboard.prototype.render_mix_group = function () {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🎉 Самые популярные аниме",
            callback_data: "/populyarnoe",
          },
        ],
        [
          {
            text: "⏳ О путешествиях во времени",
            callback_data: "/razdel/anime-o-puteshestviyax-vo-vremeni",
          },
        ],
        [
          {
            text: "🎦 Лучшие полнометражные аниме",
            callback_data: "/razdel/luchshie-polnometrazhnye-anime",
          },
        ],
        [
          {
            text: "🎌 Аниме с японской мифологии",
            callback_data: "/razdel/anime-s-yaponskoj-mifologiej",
          },
        ],
        [{ text: "🤏 Мини-аниме", callback_data: "/razdel/mini-anime" }],
        [
          {
            text: "🌌 Аниме про космос",
            callback_data: "/razdel/anime-pro-kosmos",
          },
        ],
        [
          {
            text: "U+1F1E8 Китайское аниме",
            callback_data: "/razdel/kitajskoe-anime",
          },
        ],
        [
          {
            text: "⚛ Аниме про акалипсис",
            callback_data: "/razdel/anime-apokalipsis",
          },
        ],
        [
          {
            text: "🧝‍♂️🧝‍♀️ Аниме с эльфами",
            callback_data: "/razdel/anime-s-elfami",
          },
        ],
        [
          {
            text: "🎮 Лучшие аниме по играм",
            callback_data: "/razdel/luchshie-anime-po-igram",
          },
        ],
        [
          {
            text: "👸 Лучшие фентези-аниме",
            callback_data: "/razdel/luchshie-fentezi-anime",
          },
        ],
        [
          {
            text: "😹 Лучшие комедийные аниме",
            callback_data: "/razdel/luchshie-komedijnye-anime",
          },
        ],
        [
          {
            text: "🧝‍♂️ Аниме про магию",
            callback_data: "/razdel/anime-pro-magiyu",
          },
        ],
        [{ text: "🏫 Аниме про школу", callback_data: "/genre/shkola" }],
        [
          {
            text: "💖 Лучшие аниме о любьви",
            callback_data: "/razdel/anime-pro-lyubov",
          },
        ],
        [
          {
            text: "🧛‍♂️ Аниме про вампиров",
            callback_data: "/razdel/anime-pro-vampirov",
          },
        ],
        [
          {
            text: "🔝 Топ аниме 2019 года",
            callback_data: "/razdel/top-anime-2019-goda",
          },
        ],
        [
          {
            text: "👾 Аниме с монстрами",
            callback_data: "/razdel/anime-s-monstrami",
          },
        ],
        [
          {
            text: "😋 Самые кавайные аниме",
            callback_data: "/razdel/samye-kavajnye-anime",
          },
        ],
        [
          {
            text: "🔝 Лучшие аниме 2018 года",
            callback_data: "/razdel/luchshie-anime-2018",
          },
        ],
        [{ text: "🔙 Назад", callback_data: "back" }],
      ],
    },
  };
};

module.exports = Keyboard;
