const fs = require("fs");
const Build = require("newspaperjs").Build;
const Article = require("newspaperjs").Article;

const stream = fs.createWriteStream("../results/test.json", { flags: "w" });
stream.write('{ "articles": [\n');

const categoryNames = ["sports"];

Build.getCategoriesUrl("https://www.washingtonpost.com", categoryNames)
  .then((categories) => {
    console.log("categories", categories);

    categories.forEach((categoryUrl) => {
      const categoryName = categoryUrl.split("/").at(-1);
      Build.getArticlesUrl(categoryUrl).then((articles) => {
        console.log("articles", articles);

        articles.forEach((articleUrl) => {
          Article(articleUrl).then((result) => {
            result.category = categoryName;
            stream.write(JSON.stringify(result) + ",\n");
          });
        });
      });
    });
  })
  .catch((reason) => {
    console.log("reason", reason);
  });
