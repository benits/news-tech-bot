require("dotenv").config;

const pageURL = "https://www.tecmundo.com.br/software";

const mongoURI =
  "mongodb+srv://matheus-benites:news123@cluster0.daveo.mongodb.net/<dbname>?retryWrites=true&w=majority";

module.exports = {
  pageURL,
  mongoURI,
};
