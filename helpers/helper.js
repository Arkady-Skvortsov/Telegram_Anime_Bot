const axios = require("axios");
const cheerio = require("cheerio");
const { cache } = require("../redis/db");
const Format = require("./Format");

class Address {
  constructor() {
    this.default_path = "https://animang.ru";
  }
}

class Podborki extends Address {
  constructor(podborka) {
    super();
    this.own_path = "podborki";
    this.podborka = podborka;
  }

  async get_mix_groups() {
    try {
      let podborki_hrefs = [];

      const response = await axios.get(`${this.default_path}/${this.own_path}`);

      const $ = cheerio.load(response.data);

      $("ul.podborki")
        .find("a")
        .each((i, elem) => {
          podborki_hrefs.push($(elem).attr("href"));
        });

      return podborki_hrefs;

      // const api = new API(this.podborka, 1);

      // return api.get_path_anime();
    } catch (e) {
      console.log(e);
    }
  }
}

class Janru extends Address {
  constructor(path) {
    super();
    this.path = path;
  }

  async get_janru() {
    try {
      let janres = [];

      const response = await axios.get(`${this.default_path}/${this.path}`);

      const $ = cheerio.load(response.data);

      $("ul.janru")
        .children("li")
        .each((i, elem) => {
          janres.push($(elem).children("a").attr("href"));
        });

      const api = new API("", 1);

      return api.get_path_anime();
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
      let search_links = [];

      //this.path = this.path.replace(/\s/, "+");

      let response = await axios.get(`${this.address}${this.path}`);

      let $ = cheerio.load(response.data);

      $("div.art")
        .find("div.post-home")
        .each((i, elem) => {
          search_links.push($(elem).children("a").attr("href"));
        });

      const api = new API("", 1);

      return api.get_page(search_links);
    } catch (e) {
      console.log(e);
    }
  }
}

class API extends Address {
  constructor(path, page_count) {
    super();
    this.path = path;
    this.search_path = "https://animang.ru/?s=";
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

        // $("div.art-pager")
        //   .children("a.page-numbers")
        //   .each((i, elem) => {
        //     const kaksi = $(elem)
        //       .text()
        //       .split(" ")
        //       .map(Number)
        //       .filter((num) => !isNaN(num));

        //     Object.values(kaksi).map((item) => console.log(item));
        //   });

        return this.parse_data(hrefs);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async get_page(arr) {
    try {
      return this.parse_data(...arr);
    } catch (e) {
      console.log(e);
    }
  }

  async counter_pages() {
    try {
      const data = await axios.get(`${this.default_path}/${this.path}`);

      let numbers = [];

      const $ = cheerio.load(data.data);

      $("div.art-pager")
        .children("a.page-numbers")
        .each((i, elem) => {
          numbers = [parseFloat($(elem).text())];

          // numbers.filter((n) => !Number.isNaN(n));

          //console.log(numbers);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async parse_data(payload) {
    try {
      let free_info;
      let description;
      let art;
      let user_responses = [];
      let film_annotations = [];

      payload.forEach(async (data) => {
        const response = await axios.get(data);

        const $ = cheerio.load(response.data);

        const types_format = new Format(
          $("tbody").children("tr").eq(7).children("td").find("a").text()
        );

        free_info = {
          name: {
            Russian: $("article").children("h1").text(),
            Original: $("article")
              .children("div.movie-title")
              .children("div.orig")
              .text(),
          },
          [$("tbody").children("tr").eq(0).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .children("td")
            .children("span.rt-opis")
            .text(),
          [$("tbody").children("tr").eq(1).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(1)
            .children("td")
            .eq(1)
            .text(),
          [$("tbody").children("tr").eq(2).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(2)
            .children("td")
            .eq(1)
            .text(),
          [$("tbody").children("tr").eq(3).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(3)
            .children("td")
            .eq(1)
            .text(),
          [$("tbody").children("tr").eq(4).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(4)
            .children("td")
            .eq(1)
            .text(),
          [$("tbody").children("tr").eq(5).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(5)
            .children("td")
            .next()
            .text(),
          [$("tbody").children("tr").eq(6).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(6)
            .children("td")
            .next()
            .children("a")
            .text(),
          [$("tbody").children("tr").eq(7).children("td.naz").text()]: [
            types_format.anime_types(),
          ],
          [$("tbody").children("tr").eq(8).children("td.naz").text()]: $(
            "tbody"
          )
            .children("tr")
            .eq(8)
            .children("td")
            .next()
            .children("a")
            .text(),
        };

        art = $("article")
          .find("div.poster-rt")
          .children("img.s-img")
          .attr("src");

        description = $("article")
          .find("div.opis")
          .children("div.infotext")
          .children("p")
          .text();

        $("div.comment").each((i, elem) => {
          user_responses.push({
            user: [
              $(elem).find("div.ct-polosa").children("div.ct-author").text(),
            ].join(" "),
            date: $(elem).find("div.ct-polosa").children("div.ct-ti").text(),
            content: $(elem).find("div.ct-text").children("p").text(),
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

          film_annotations = film_annotations.filter(
            (item) => item.name !== ""
          );
        });

        return {
          free_info,
          art,
          description,
          user_responses,
          film_annotations,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { API, Janru, Podborki, Search };
