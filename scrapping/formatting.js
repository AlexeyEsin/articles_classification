const fs = require("fs");
const JSONStream = require("JSONStream");

const readStream = fs.createReadStream("../results/articles.json", { flags: "r" });
const writeStream = fs.createWriteStream("../results/articles_f.json", { flags: "w" });

readStream.pipe(JSONStream.parse("*")).on("data", (articles) => {
  articles.forEach((article) => {
    writeStream.write(JSON.stringify(article) + "\n");
  });
});
