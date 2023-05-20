const fs = require("fs");
const JSONStream = require("JSONStream");

const readStream = fs.createReadStream("../results/articles.json", { flags: "r" });
const writeStream = fs.createWriteStream("../results/articles_filtered.json", { flags: "w" });

writeStream.write('{ "articles": [\n');

readStream.pipe(JSONStream.parse("*")).on("data", (articles) => {
  articles.forEach((article) => {
    articles.forEach((article_inner) => {
      article.text = article.text.replace(article_inner.title, "");
    });
    writeStream.write(JSON.stringify(article) + ", \n");
  });
});
