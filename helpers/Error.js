module.exports = class Error {
  page_not_found() {
    return new Error("Такой раздел не найден!");
  }

  year_not_found() {
    return new Error("Аниме по такому году не найдено");
  }

  category_not_found() {
    return new Error("Такая категория не найдена");
  }

  search_not_found() {
    return new Error("Данное аниме не найдено");
  }
};

module.exports = { error: new Error() };
