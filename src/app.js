"use strict";
const webScraping = require("./botNews");
const data = require("./botNews/data");
const mongoURI =
  "mongodb+srv://matheus-benites:news123@cluster0.daveo.mongodb.net/techbot?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const cron = require("node-cron");
const express = require("express");
const compareAndSaveResults = require("./botNews/resultAnalysis");
const getTop10News = require("./botNews/getFirst5News");

// const Telegram = require("telegram-node-bot");
// const TelegramBaseController = Telegram.TelegramBaseController;
// const TextCommand = Telegram.TextCommand;
// const chatbot = new Telegram.Telegram(
//   "1341231475:AAGVzrbuX5oGVAzMT75CXvq1693xgMzpGE0"
// );
let app = express();
const Telegraf = require("telegraf");

const bot = new Telegraf("1341231475:AAGVzrbuX5oGVAzMT75CXvq1693xgMzpGE0");

cron.schedule("*/5 * * * *", async () => {
  mongoose
    .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
  let response = await webScraping();

  let listNews = JSON.parse(response.publishedNews);

  listNews.forEach((news) => {
    compareAndSaveResults(news, bot);
  });

  await getTop10News(bot);
});

bot.command("allnews", async (ctx) => {
  try {
    let response = await webScraping();

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
