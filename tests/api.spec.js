const request = require("supertest");
// const { jest } = require("jest");
const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { parse } = require("dotenv");

describe("Anime API", () => {
  let get_data;
  let test_film_page_results;

  beforeEach(async () => {
    test_film_page_results = [
      "https://animang.ru/6060-sudba-velikij-prikaz-film-1.html",
      "https://animang.ru/6052-vajolet-evergarden-film.html",
      "https://animang.ru/6132-neznakomec-na-beregu-morya.html",
      "https://animang.ru/6977-ona-videla-nebo.html",
      ",https://animang.ru/6118-klinok-rassekayushhij-demonov-beskonechnyj-poezd.html",
      "https://animang.ru/6114-darovannyj-film.html",
      "https://animang.ru/7780-sozdannyj-v-bezdne-rassvet-glubokoj-dushi.html",
      "https://animang.ru/7021-sozdannyj-v-bezdne-kompilyaciya.html",
      "https://animang.ru/6030-sudba-noch-sxvatki-prikosnovenie-nebes-3.html",
      "https://animang.ru/6261-bem-stat-chelovekom.html",
    ];

    get_data = jest.fn(async (data) => {
      try {
        let elements = [];

        const response = await axios.get(data);

        const $ = cheerio.load(response.data);

        $("div.post-home").each((i, elem) => {
          const element = $(elem).children("a").attr("href");

          console.log(element);
          elements.push(element);
        });

        //console.log(...elements);

        return elements;
      } catch (e) {
        console.log(e);
      }
    });

    await get_data("https://animang.ru/filmy.page/1");
  });

  it("Test first (anime) films page and should get current data from page", () => {
    //const data = await get_data("https://animang.ru/filmy.page/1");
    expect(1).toBe(2);
    //expect(data).toBe(JSON.parse(...test_film_page_results));
  });
});
