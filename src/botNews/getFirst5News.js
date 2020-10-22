const News = require("./models/News");

const getTop10News = async (bot) => {
  try {
    let allNewsTop10 = [];
    allNewsTop10 = await News.find({ hasPosted: false })
      .sort({ createdAt: -1 })
      .limit(5);

    allNewsTop10.forEach((news) => {
      setTimeout(async function () {
        bot.telegram
          .sendMessage(
            -1001467586057,
            `<strong>Novas Notícias Now!</strong>\n\n<b>${news.title}</b>\n\n<b>${news.date} - ${news.minutesAgo}</b>\n\n${news.link}`,
            { parse_mode: "HTML" }
          )
          .then(() => {
            console.log("====================================");
            console.log("mensagem enviada");
            console.log("====================================");

            var newQuery = {
              title: news.title,
              link: news.link,
              date: news.date,
              minutesAgo: news.minutesAgo,
              hasPosted: true,
            };

            News.findOneAndUpdate(
              { link: news.link, date: news.date, title: news.title },
              newQuery,
              { new: true, upsert: true, setDefaultsOnInsert: true },
              (error, doc) => {
                // error: any errors that occurred
                if (error) {
                  console.error(error);
                }

                console.log(doc);
                // doc: the document before updates are applied if `new: false`, or after updates if `new = true`
              }
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }, 5000);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTop10News;
