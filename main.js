require("dotenv").config();
const { Telegraf } = require("telegraf");
const {
  API,
  Janru,
  Podborki,
  Search,
  catcher_info,
} = require("./helpers/Helper");
const Keyboard = require("./helpers/Keybord");

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

      bot.telegram.sendMessage(
        id,
        "Choose the option in menu",
        new Keyboard().render_main()
      );

      bot.on("callback_query", async (ctx) => {
        const id = msg.chat.id;
        const text = ctx.update.callback_query.data;

        switch (text) {
          case "all_anime":
            new API("", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `${data}`,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "janru":
            msg.telegram.sendMessage(
              id,
              "Types of anime",
              new Keyboard().render_janru()
            );
            break;
          case "groups":
            bot.telegram.sendMessage(
              id,
              "Change some group of anime",
              new Keyboard().render_mix_group()
            );
            break;
          case "search_for_year":
            msg.telegram.sendMessage(
              id,
              "Search for year (from 1997 year and later)",
              new Keyboard().render_back_button()
            );

            bot.on("message", (year_ctx) => {
              new API(`god/${year_ctx.message.text}`, 1)
                .get_path_anime()
                .then((data) => {
                  msg.telegram.sendMessage(
                    id,
                    `
                    (${data.free_info.name.Russian}/${data.free_info.name.Original})  
                    ${data.art}
                    `,
                    new Keyboard().render_anime_buttons()
                  );
                })
                .catch((e) => console.log(e));
            });
            break;
          case "search_for_name":
            msg.telegram.sendMessage(
              id,
              "Search for name, example: Violet Evergarden",
              new Keyboard().render_back_button()
            );

            bot.on("message", (name_ctx) => {
              new Search(`${name_ctx.message.text}`)
                .search_data()
                .then((data) => {
                  msg.telegram.sendMessage(
                    id,
                    `
                    (${data.free_info.name.Russian}/${data.free_info.name?.Original})
                    ${data.art}
                    `,
                    new Keyboard().render_anime_buttons()
                  );

                  catcher_info(data.free_info.name.Russian);
                })
                .catch((e) => console.log(e));
            });
            break;
          case "current_information":
            new API("novinki", 1)
              .get_path_anime()
              .then((data) => {
                const current_information = `
                  ${Object.entries(data.free_info)[1]}\n
                  ${Object.entries(data.free_info)[2]}\n
                  ${Object.entries(data.free_info)[3]}\n
                  ${Object.entries(data.free_info)[4]}\n
                  ${Object.entries(data.free_info)[5]}\n
                  ${Object.entries(data.free_info)[6]}\n
                  ${Object.entries(data.free_info)[7]}\n
                  ${Object.entries(data.free_info)[8]}\n
                  ${Object.entries(data.free_info)[9]}\n
                `;

                msg.telegram.sendMessage(
                  id,
                  current_information,
                  new Keyboard().render_back_button()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "description":
            new API("novinki", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `${data.description}`,
                  new Keyboard().render_back_button()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "responses":
            new API("novinki", 1)
              .get_path_anime()
              .then((data) => {
                // msg.telegram.sendMessage(
                //   id,
                //   JSON.stringify(data.user_responses),
                //   new Keyboard().render_back_button()
                // );

                data.user_responses.forEach((item) => {
                  msg.telegram.sendMessage(
                    id,
                    `${item.user}(${item.date}): ${item.content}`,
                    new Keyboard().render_back_button()
                  );
                });
              })
              .catch((e) => console.log(e));
            break;
          //category
          case "annotations":
            new API("novinki", 1)
              .get_path_anime()
              .then((data) => {
                const { film_annotations } = data;

                film_annotations.forEach((item) => {
                  msg.telegram.sendMessage(
                    id,
                    `
                    ${item.name}
                    ${item.href}
                    `,
                    new Keyboard().render_back_button()
                  );
                });
                // msg.telegram.sendMessage(
                //   id,
                //   `${data.film_annotations}`,
                //   new Keyboard().render_back_button()
                // );
              })
              .catch((e) => console.log(e));
            break;
          case "new":
            new API("novinki", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                    Тип - ${text}
                    ${data.free_info.name.Russian}, 
                    ${data.art}
                  `
                );
              })
              .catch((e) => console.log(e));
            break;
          case "cinemas":
            new API("filmy", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                    Тип - ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "serial":
            new API("serialy", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian} 
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "ongoing":
            new API("ongoingi", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "tv":
            new API("tip/tv", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "ova":
            new API("tip/ova", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "ona":
            new API("tip/ona", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                  ${data.free_info.name.Russian} 
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "tv-speshl":
            new API("tip/tv-speshl", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "anounce":
            new API("anons", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "top":
            new API("top", 1)
              .get_path_anime()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "podborki":
            new API("podborki", 1)
              .get_page()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian} 
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "random":
            new API("random", 1)
              .get_page()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                  ${data.free_info.name.Russian}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          //category

          //janru - сделать функцию для оптимизации
          case "komediya":
            new Janru("genre/komediya")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text} 
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "mexa":
            new Janru("genre/mexa")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "detektiv":
            new Janru("genre/detektiv")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип -  ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "drama":
            new Janru("genre/drama")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип -  ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "mistika":
            new Janru("genre/mistika")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип -  ${text}
                  ${data.free_info.name.Russian}
                  ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "fantastika":
            new Janru("genre/fantastika")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "fentezi":
            new Janru("genre/fentezi")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "parodiya":
            new Janru("genre/parodiya")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "romantika":
            new Janru("genre/romantika")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "triller":
            new Janru("genre/triller")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "muzyka":
            new Janru("genre/muzyka")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "povsednevnost":
            new Janru("genre/povsednevnost")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "uzhasy":
            new Janru("genre/uzhasy")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "boevye-iskusstva":
            new Janru("genre/boevye-iskusstva")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "sport":
            new Janru("genre/sport")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "istoricheskij":
            new Janru("genre/istoricheskij")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;

          case "etti":
            new Janru("genre/etti")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "priklyuchenia":
            new Janru("genre/priklyucheniya")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "syodzyo":
            new Janru("genre/syodzyo")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
          case "syonen":
            new Janru("genre/syonen")
              .get_janru()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                 ${data.free_info.name.Russian}
                 ${data.art}
                `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;

          //mix block
          case "/populyarnye":
            new Podborki("populyarnye")
              .get_mix_groups()
              .then((data) => {
                //   msg.telegram.sendMessage(
                //     id,
                //     `
                //     Тип - ${text}
                //  ${data.free_info.name.Russian}
                //  ${data.art}
                // `,
                //     new Keyboard().render_anime_buttons()
                //   );
                console.log(data);
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-o-puteshestviyax-vo-vremeni":
            new Podborki("razdel/anime-o-puteshestviyax-vo-vremeni")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
               ${data.free_info.name.Russian}
               ${data.art}
              `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/luchshie-polnometrazhnye-anime":
            new Podborki("razdel/luchshie-polnometrazhnye-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-s-yaponskoj-mifologiej":
            new Podborki("razdel/anime-s-yaponskoj-mifologiej")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/mini-anime":
            new Podborki("razdel/mini-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-pro-kosmos":
            new Podborki("razdel/anime-pro-kosmos")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/kitajskoe-anime":
            new Podborki("razdel/kitajskoe-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
                   ${data.free_info.name.Russian}
                   ${data.art}
                  `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-apokalipsis":
            new Podborki("razdel/anime-apokalipsis")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-s-elfami":
            new Podborki("razdel/anime-s-elfami")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/luchshie-anime-po-igram":
            new Podborki("razdel/luchshie-anime-po-igram")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/luchshie-fentezi-anime":
            new Podborki("razdel/luchshie-fentezi-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/luchshie-komedijnye-anime":
            new Podborki("razdel/luchshie-komedijnye-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-pro-magiyu":
            new Podborki("razdel/anime-pro-magiyu")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/genre/shkola":
            new Podborki("genre/shkola")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-pro-lyubov":
            new Podborki("razdel/anime-pro-lyubov")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-pro-vampirov":
            new Podborki("razdel/anime-pro-vampirov")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;

          case "/razdel/top-anime-2019-goda":
            new Podborki("razdel/top-anime-2019-goda")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/anime-s-monstrami":
            new Podborki("razdel/anime-s-monstrami")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                   Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/samye-kavajnye-anime":
            new Podborki("razdel/samye-kavajnye-anime")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "/razdel/luchshie-anime-2018":
            new Podborki("razdel/luchshie-anime-2018")
              .get_mix_groups()
              .then((data) => {
                msg.telegram.sendMessage(
                  id,
                  `
                  Тип - ${text}
             ${data.free_info.name.Russian}
             ${data.art}
            `,
                  new Keyboard().render_anime_buttons()
                );
              })
              .catch((e) => console.log(e));
            break;
          case "back":
            try {
              ctx.deleteMessage();
            } catch (e) {
              console.log(e);
            }
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
      for (let i = 0; i < msg.message.message_id; i++) {
        msg.deleteMessage(i + 1);
      } //Fix later
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

module.exports = bot;
