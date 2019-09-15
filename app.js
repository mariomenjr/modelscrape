const trae = require("trae");
const cheerio = require("cheerio");

const { pages } = require("./config/target");

(async function() {
  try {
    const repssUrl = pages.listRepresentatives;

    const response = await trae.get(repssUrl);
    const data = response.data;

    const $ = cheerio.load(data);
    const str = $(".diputadoDetalles");

    throw new Error();
  } catch (error) {
    console.error(error);
  }
})();
