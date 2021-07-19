const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class Format {
  constructor(string) {
    this.string = string;
  }

  anime_types() {
    return this.string.replace(/\^[А-Я]/gi, ", ");
  }

  links_anime_digit() {
    const name = this.string.match(/\D/g);
    const year = this.string.match(/\d+/g);

    return `${[name].join().replace(/\,/g, "")}${[year]
      .join()
      .replace(/\,/g, " ")}`;
  }
};
