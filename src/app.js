"use strict";
const webScraping = require("./botNews");
const data = require("./botNews/data");
const { pageURL } = data;
const cron = require("node-cron");
const express = require("express");

// const Telegram = require("telegram-node-bot");
// const TelegramBaseController = Telegram.TelegramBaseController;
// const TextCommand = Telegram.TextCommand;
// const chatbot = new Telegram.Telegram(
//   "1341231475:AAGVzrbuX5oGVAzMT75CXvq1693xgMzpGE0"
// );
let app = express();
const Telegraf = require("telegraf");

const bot = new Telegraf("1341231475:AAGVzrbuX5oGVAzMT75CXvq1693xgMzpGE0");

cron.schedule("* * * * *", async () => {
  let response = await webScraping();

  console.log("====================================");
  console.log("enviando");
  console.log("====================================");
  let listNews = JSON.parse(response.publishedNews);

  listNews.forEach((news) => {
    try {
      bot.telegram.sendMessage(
        -1001467586057,
        `<b>${news.title}</b>\n\n <b>${news.date} - ${news.minutesAgo}</b>\n\n ${news.link}`,
        { parse_mode: "HTML" }
      );
    } catch (err) {
      console.error(err);
    }
  });
});

bot.start((ctx) => ctx.reply("Hello world"));

// class NewsController extends TelegramBaseController {
//   allNewsAction(scope) {
//     getNews();
//     let msg = "!chamou google";
//     scope.sendMessage(msg);
//   }
//   get routes() {
//     return {
//       allNews: "allNewsAction",
//     };
//   }
// }

// chatbot.router.when(
//   new TextCommand("/allnews", "allNews"),
//   new NewsController()
// );

bot.command("allnews", async (ctx) => {
  try {
    let response = await webScraping();

    console.log("====================================");
    console.log(typeof JSON.parse(response.publishedNews));
    console.log("====================================");
    let listNews = JSON.parse(response.publishedNews);

    listNews.forEach((news) => {
      ctx.replyWithHTML(
        `<b>${news.title}</b>\n\n <b>${news.date} - ${news.minutesAgo}</b>\n\n ${news.link}`
      );
    });
  } catch (error) {
    console.error(error);
  }
});

bot.launch();
app.listen(1313);
