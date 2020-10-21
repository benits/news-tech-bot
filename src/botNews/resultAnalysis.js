const data = require("./data");
const { mongoURI } = data;

const mongoose = require("mongoose");
const News = require("./models/News");

mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const compareAndSaveResults = async (dataObj) => {
  try {
    var query = {
        amount: dataObj.amount,
        publishedNews: dataObj.publishedNews,
      },
      update = { expire: new Date() },
      options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      };

    // Find the document
    News.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      console.log("====================================");
      console.log("result: ", result);
      console.log("====================================");
      // do something with the document
    });
    // let newNews = new News(dataObj);

    // News.find({}, function (err, newsList) {
    //   return newsList;
    // })
    //   .then((newsList) => {
    //     let result;
    //     if (newsList == "") {
    //       //console.log(`a new data was created: ${JSON.stringify(newNews)}`);
    //       newNews
    //         .save()
    //         .then((ret) => {
    //           console.log("====================================");
    //           console.log("ret: ", ret);
    //           console.log("====================================");
    //         })
    //         .catch((error) => console.log(error));

    //       return result;
    //     }

    //     const { amount, publishedNews } = dataObj;

    //     // const dbId = newsList.amount;
    //     // const dbAmount = newsList.amount;
    //     // const dbNews = newsList.publishedNews;

    //     // let catchDifference = false;

    //     // if (dbAmount !== amount) {
    //     //   catchDifference = true;
    //     // } else {
    //     //   dbNews.forEach((news, index) => {
    //     //     if (news !== publishedNews[index]) {
    //     //       catchDifference = true;
    //     //     }
    //     //   });
    //     // }

    //     // if (catchDifference) {
    //     //   console.log("A New evidence was found, updating database... ");
    //     // }

    //     // console.log("File is equal to page, no news to report");
    //   })
    //   .then(() => {
    //     mongoose.disconnect();
    //   })
    //   .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }

  //   mongoose.disconnect();
};

module.exports = compareAndSaveResults;
