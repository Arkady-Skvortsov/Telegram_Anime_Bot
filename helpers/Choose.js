const bot = require("../main");
const Keyboard = require("./Keybord");

//Сделать рефакторинг для категорий, жанров и тд..
function choose(id, cls, link, method) {
  // for (let i = 0; i < payload.length; i++) {
  //   switch (payload[i]) {
  //     case choose:
  //       fun();
  //       break;
  //   }
  // }
  // bot.on("callback_query", (ctx) => {
  //const id = ctx.chat.id;

  // switch (_) {
  //   case "/razdel/mini-anime":
  new cls(link)
    .get_page()
    .then((data) => {
      msg.telegram.sendMessage(
        id,
        `
         ${data.free_info.name.Russian}
         ${data.art}
        `,
        new Keyboard().render_anime_buttons()
      );
      console.log(data);
    })
    .catch((e) => console.log(e));
  // break;
}
// });
//}

choose();
