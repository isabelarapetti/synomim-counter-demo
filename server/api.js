const express = require("express");
const router = express.Router();
var WordNet = require("node-wordnet");

//test
router.get("/", (req, res) => {
  res.send("api worksssss");
});

router.get("/parse", async (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      const excludedWords = ["a", "the", "and", "of", "in", "be", "also", "as"];
      //turn string into array list
      const words = convertStringToArray(text);
      const filteredWords = removeExcludedWords(words, excludedWords);

      console.log(filteredWords);
      //response = await getSynonimsPerWordList(filteredWords);
      let synonimsPerWordList = [];

      const result = await Promise.all(
        filteredWords.map(async (word) => {
          console.log("promise", word);
          let response = await fetchWordnetSynonims(word);
          synonimsPerWordList.push(response);
          console.log(synonimsPerWordList);
        })
      );

      console.log(result, " ----------------resultadooo -------");
      res.status(200).json(scanedTextTest);
    }
  } catch (error) {
    res.status(500).json({ error: "AN error ocurred" });
  } finally {
    res.end();
  }
});

convertStringToArray = function (str) {
  return str.trim().split(" ");
};

removeExcludedWords = function (words, excludedWords) {
  return words.filter(function (word) {
    return excludedWords.indexOf(word) < 0;
  });
};

async function fetchWordnetSynonims(word) {
  let wordInfo = {
    word: word,
    synonyms_found: 0,
    synonims_list: [],
  };

  const wordnet = new WordNet();

  const resp = await wordnet.lookup(word, function (results) {
    results.forEach(function (result) {
      console.log(result.synonyms);
      console.log("--------------------");
      wordInfo.synonyms_found += result.synonyms.length
        ? result.synonyms.lengtt
        : 0;
      wordInfo.synonims_list = wordInfo.synonims_list.concat(result.synonyms);
      //TODO: Add dedupe logic if synonim was prevously found in other word
    });
    return wordInfo;
  });

  console.log(resp, "wordInfo");
  return resp;
}

module.exports = router;

// await wordnet.lookup(word, async function (results) {
//   console.log("lookup");
//   await results.forEach(function (result) {
//     console.log(result.synonyms);
//     console.log("--------------------");
//     wordInfo.synonyms_found += result.synonyms.length;
//     wordInfo.synonims_list = wordInfo.synonims_list.concat(result.synonyms);
//     //TODO: Add dedupe logic if synonim was prevously found in other word
//   });

const scanedTextTest = [
  { word: "Hydrogen", synonyms_found: 1 },
  { word: "Helium", synonyms_found: 2 },
  { word: "Lithium", synonyms_found: 3 },
  { word: "Beryllium", synonyms_found: 4 },
  { word: "Boron", synonyms_found: 5 },
  { word: "Carbon", synonyms_found: 6 },
  { word: "Nitrogen", synonyms_found: 7 },
  { word: "Oxygen", synonyms_found: 8 },
  { word: "Fluorine", synonyms_found: 9 },
  { word: "Neon", synonyms_found: 10 },
];
