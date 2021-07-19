module.exports = class Error {
  page_not_found() {
    throw new Error("Такой раздел не найден!");
  }

  year_not_found() {
    throw new Error("Аниме по такому году не найдено");
  }

  category_not_found() {
    throw new Error("Такая категория не найдена");
  }

  search_not_found() {
    throw new Error("Данное аниме не найдено");
  }
};

module.exports = { error: new Error() };
