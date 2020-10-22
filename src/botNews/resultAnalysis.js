const News = require("./models/News");

const compareAndSaveResults = async (dataObj, bot) => {
  try {
    var query = {
      title: dataObj.title,
      link: dataObj.link,
      date: dataObj.date,
      minutesAgo: dataObj.minutesAgo,
      hasPosted: false,
    };

    let dataObjAlready = await News.findOne(query).exec();

    if (!dataObjAlready) {
      await News.create(query);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = compareAndSaveResults;
