const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  publishedNews: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("News", newsSchema);
