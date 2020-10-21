const puppeteer = require("puppeteer");

const pageURL = "https://www.tecmundo.com.br/software";

const webScraping = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  let dataObject = {};

  try {
    await page.goto(pageURL);
    const publishedNews = await page.evaluate(() => {
      const newsDOM = document.querySelectorAll(
        "#js-main > div > div.z--row > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg.z--mt-32 > div.tec--list__item"
      );

      let newsList = [];

      newsDOM.forEach((linkElement) => {
        const currentNews = linkElement.querySelector(
          "a.tec--card__title__link"
        ).innerHTML;

        const currentNewsLink = linkElement
          .querySelector("a.tec--card__title__link")
          .getAttribute("href");

        const currentDate = linkElement.querySelector(
          "div.tec--timestamp__item"
        ).innerHTML;

        const currentMinutesAgo = linkElement.querySelector("div.z--truncate")
          .innerHTML;

        newsList.push({
          title: currentNews,
          link: currentNewsLink,
          date: currentDate,
          minutesAgo: currentMinutesAgo,
        });
      });

      return newsList;
    });

    dataObject = {
      amount: publishedNews.length,
      publishedNews: JSON.stringify(publishedNews),
    };
  } catch (error) {
    console.log(error);
  }

  browser.close();

  return dataObject;
};

module.exports = webScraping;
