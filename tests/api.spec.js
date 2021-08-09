const request = require("supertest");
const { API, Search, Janru, Podborki } = require("../helpers/Helper");
const { db } = require("../redis/db");

describe("Telegram bot testing", () => {
  describe("Redis key-value testing", () => {});

  describe("API class testing", () => {
    let novinki_hrefs = [];
    let detective_janru_hefs = [];
    let popolyarnye_podborka_hrefs = [];
    let cinemas_category_hrefs = [];

    beforeEach(() => {
      novinki_hrefs = [
        "https://animang.ru/4905-carstvo-3-sezon.html",
        "https://animang.ru/6253-vechnaya-volya.html",
        "https://animang.ru/2647-zakryty-v-ramkax-genom-pryamaya-translyaciya.html",
        "https://animang.ru/2827-1-mag-obmanshhik-iz-drugogo-mira.html",
        "https://animang.ru/5280-udar-krovi-ova-4.html",
        "https://animang.ru/8268-ulica-demonov-2-sezon.html",
        "https://animang.ru/6052-vajolet-evergarden-film.html",
        "https://animang.ru/6132-neznakomec-na-beregu-morya.html",
        "https://animang.ru/6977-ona-videla-nebo.html",
        "https://animang.ru/5623-myau-ispolnyayushhaya-mechty.html",
      ];

      detective_janru_hefs = [
        "https://animang.ru/8320-memuary-vanitasa.html",
        "https://animang.ru/8436-akvatop-belogo-peska.html",
        "https://animang.ru/8507-bozhestva-idaten-v-mirnom-pokolenii.html",
        "https://animang.ru/8301-sonni-boj.html",
        "https://animang.ru/8314-kogda-plachut-cikady-vypusknoj.html",
        "https://animang.ru/8358-re-mejn.html",
        "https://animang.ru/8404-lunnoe-puteshestvie-privedyot-k-novomu-miru.html",
        "https://animang.ru/8521-mag-na-polnuyu-stavku-5-sezon.html",
        "https://animang.ru/8409-razmerennaya-zhizn-chit-farmacevta.html",
        "https://animang.ru/8414-drakon-gornichnaya-kobayashi-san-2-sezon.html",
      ];

      popolyarnye_podborka_hrefs = [
        "https://animang.ru/1162-2-etot-glupyj-svin-ne-ponimaet-mechtu-devochki-zajki.html",
        "https://animang.ru/1399-sharlotta.html",
        "https://animang.ru/2124-3-klinok-rassekayushhij-demonov.html",
        "https://animang.ru/464-demony-starshej-shkoly.html",
        "https://animang.ru/705-demony-starshej-shkoly-1-sezon.html",
        "https://animang.ru/711-demony-starshej-shkoly-3-sezon.html",
        "https://animang.ru/1149-2-tokijskij-gul-4-sezon.html",
        "https://animang.ru/242-3-tokijskij-gul-3-sezon.html",
        "https://animang.ru/224-mastera-mecha-onlajn.html",
        "https://animang.ru/227-mastera-mecha-onlajn-2.html",
      ];
    });

    test("'novinki' first page should has returned novinki_hrefs values", async () => {
      await new API("novinki", 1)
        .get_path_anime()
        .then((data) => expect(data).toBe(novinki_hrefs))
        .catch((e) => console.log(e));
    });

    describe("Group of search requests/Search class testing", () => {
      let search = {
        name: [],
        year: [],
      };

      beforeEach(() => {
        search.name = [
          "https://animang.ru/6052-vajolet-evergarden-film.html",
          "https://animang.ru/4273-vajolet-evergarden-vechnost-i-prizrak-pera.html",
          "https://animang.ru/124-vajolet-evergarden.html",
        ];

        search.year = [
          "https://animang.ru/7357-u-nashego-starshego-brata-problemy-s-golovoj.html",
          "https://animang.ru/925-magistr-dyavolskogo-kulta.html",
          "https://animang.ru/276-4-persona-5.html",
          "https://animang.ru/233-4-shhelkunchik-kitaro.html",
          "https://animang.ru/5139-vtoroj-mejdzhor-1-sezon.html",
          "https://animang.ru/5560-gandam-bild-dajvery.html",
          "https://animang.ru/5527-ura-mechte-devushki-iz-gruppy-1-sezon.html",
          "https://animang.ru/5316-chelovek-dyavol-plach.html",
          "https://animang.ru/1234-set-mechej-blagorodnaya-rycarskaya-dusha.html",
          "https://animang.ru/4505-devchachij-kemping-1-sezon.html",
        ];
      });

      test("Search anime for name", async () => {
        try {
          await new Search("Violet")
            .search_data()
            .then((data) => expect(data).toBe(search.name))
            .catch((e) => console.log(e));
        } catch (e) {
          console.log(e);
        }
      });

      test("Search anime for year", async () => {
        try {
          await new API("god/2018", 1)
            .get_path_anime()
            .then((data) => expect(data).toStrictEqual(search.year))
            .catch((e) => console.log(e));
        } catch (e) {
          console.log(e);
        }
      });
    });

    test("first page of 'detective' janru should returned detective_janru_hrefs values/Janru class testing", async () => {
      try {
        await new Janru("genre/detektiv")
          .get_janru()
          .then((data) => expect(data).toStrictEqual(detective_janru_hefs))
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    });

    test("first page of 'the most popular' mix should returned popolyarbye_podborka_hrefs value/Podborki class testing", async () => {
      try {
        await new Podborki("populyarnye")
          .get_mix_groups()
          .then((data) =>
            expect(data).toStrictEqual(popolyarnye_podborka_hrefs)
          )
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    });

    //still now
    // xit("first page of 'cinemas' category should returned some values/Categories class testing", async () => {
    //   await new Categories("cinemas")
    //     .get_categories()
    //     .then((payload) => console.log(payload))
    //     .catch((e) => console.log(e));
    // });
  });
});
