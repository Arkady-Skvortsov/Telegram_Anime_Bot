const axios = require("axios");
const cheerio = require("cheerio");
// const redis = require("../db/db");
const Format = require("./Format");

class Address {
  constructor() {
    this.default_path = "https://animang.ru";
  }
}

class Podborki extends Address {
  constructor() {
    super();
    this.own_path = "podborki";
  }

  async get_mix_groups() {
    try {
      let hrefs = [];

      const response = await axios.get(`${this.default_path}/${this.own_path}`);

      const $ = cheerio.load(response.data);

      $("ul.podborki")
        .find("a")
        .each((i, elem) => {
          hrefs.push($(elem).attr("href"));
        });

      console.log(...hrefs);
      //await new API(hrefs, 1).get_page(hrefs);
    } catch (e) {
      console.log(e);
    }
  }
}

class Categories extends Address {
  constructor() {
    super();
  }

  async get_categories() {
    try {
      let category_hrefs = [];

      const response = await axios.get(this.default_path);

      const $ = cheerio.load(response.data);

      $("div.hed-link")
        .find("li")
        .each((i, elem) => {
          const category_obj = {
            name: $(elem).children("a").text(),
            href: $(elem).children("a").attr("href"),
          };

          category_hrefs.push(category_obj);

          category_hrefs = category_hrefs.filter((el) => el.href !== undefined);
        });

      return category_hrefs;
    } catch (e) {
      console.log(e);
    }
  }
}

class Janru extends Address {
  constructor() {
    super();
  }

  async get_janru() {
    try {
      let janres;

      const response = await axios.get(this.default_path);

      const $ = cheerio.load(response.data);

      $("ul.janru")
        .children("li")
        .each((i, elem) => {
          janres.push($(elem).children("a").attr("href"));
        });

      return janres;
    } catch (e) {
      console.log(e);
    }
  }
}

class Search {
  constructor(path) {
    this.path = path;
    this.address = "https://animang.ru/?s=";
  }

  async search_data() {
    try {
      this.path = this.path.replace(/\s/g, "+");

      let response = await axios.get(`${this.address}${this.path}`);

      let $ = cheerio.load(response.data);

      return $("div.art")
        .find("div.post-home")
        .each((i, elem) =>
          $(elem).children("a").attr("href")
            ? console.log(true)
            : console.log(void 0)
        );
    } catch (e) {
      console.log(e);
    }
  }
}

// const search = new Search("Danil");

// search.search_data();

class API extends Address {
  constructor(path, page_count) {
    super();
    this.path = path;
    this.page_count = page_count;
  }

  async get_path_anime() {
    try {
      const hrefs = [];

      for (let y = 1; y <= this.page_count; y++) {
        const content = await axios.get(
          `${this.default_path}/${this.path}/page/${y}`
        );

        const $ = cheerio.load(content.data);

        $("div.post-home").each((i, elem) => {
          const element = $(elem).children("a").attr("href");

          hrefs.push(element);
        });
      }

      await this.get_page(hrefs);
    } catch (e) {
      console.log(e);
    }
  }

  async subscribe() {
    try {
      // let hrefs;
      // const sub_anime = await axios.get(`https://animang.ru/${this.path}`);
      // const $ = cheerio.load(sub_anime);
      // $("div.post-home").each((i, elem) => {
      //   const element = $(elem).children("a").attr("href");
      //   hrefs.push(element);
      // });
      // redis.set("some_key", "here");
      // setInterval(() => {
      //   redis
      //     .get("some_key")
      //     .then((data) => console.log(data))
      //     .catch((e) => console.log(e));
      // }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async get_page(arr) {
    try {
      for (let href of arr) {
        const response = await axios.get(href);

        const $ = cheerio.load(response.data);

        await this.parse_data($);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async parse_data($) {
    try {
      const types_format = new Format(
        $("tbody").children("tr").eq(7).children("td").find("a").text()
      );

      let user_responses = [];
      let film_annotations = [];

      const free_info = {
        name: {
          Russian: $("article").children("h1").text(),
          Original: $("article")
            .children("div.movie-title")
            .children("div.orig")
            .text(),
        },
        [$("tbody").children("tr").eq(0).children("td.naz").text()]: $("tbody")
          .children("tr")
          .children("td")
          .children("span.rt-opis")
          .text(),
        [$("tbody").children("tr").eq(1).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(1)
          .children("td")
          .eq(1)
          .text(),
        [$("tbody").children("tr").eq(2).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(2)
          .children("td")
          .eq(1)
          .text(),
        [$("tbody").children("tr").eq(3).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(3)
          .children("td")
          .eq(1)
          .text(),
        [$("tbody").children("tr").eq(4).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(4)
          .children("td")
          .eq(1)
          .text(),
        [$("tbody").children("tr").eq(5).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(5)
          .children("td")
          .next()
          .text(),
        [$("tbody").children("tr").eq(6).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(6)
          .children("td")
          .next()
          .children("a")
          .text(),
        [$("tbody").children("tr").eq(7).children("td.naz").text()]: [
          types_format.anime_types(),
        ],
        [$("tbody").children("tr").eq(8).children("td.naz").text()]: $("tbody")
          .children("tr")
          .eq(8)
          .children("td")
          .next()
          .children("a")
          .text(),
      };

      const art = $("article")
        .find("div.poster-rt")
        .children("img.s-img")
        .attr("src");

      const description = $("article")
        .find("div.opis")
        .children("div.infotext")
        .children("p")
        .text();

      $("div.comment").each((i, elem) => {
        user_responses.push({
          [$(elem).find("div.ct-polosa").children("div.ct-author").text()]: {
            date: $(elem).find("div.ct-polosa").children("div.ct-ti").text(),
            content: $(elem).find("div.ct-text").children("p").text(),
          },
        });

        return user_responses.unshift();
      });

      $("tr.pers").each((i, elem) => {
        const link_format = new Format(
          $(elem).children("td").children("a").text()
        );

        film_annotations.push({
          name: link_format.links_anime_digit(),
          href: $(elem).children("td").children("a").attr("href"),
        });

        film_annotations = film_annotations.filter((item) => item.name !== "");
      });

      return {
        free_info,
        art,
        description,
        user_responses,
        film_annotations,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { API, Janru, Categories, Podborki };
