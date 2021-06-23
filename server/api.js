const express = require("express");
const router = express.Router();
var WordNet = require("node-wordnet");

router.post("/parse", async (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      let synonimsPerWordList = [];
      const excludedWords = ["a", "the", "and", "of", "in", "be", "also", "as"];

      // turn string into array list
      const words = convertStringToArray(text);
      // cleaning rules
      let filteredWords = removeExcludedWords(words, excludedWords);
      filteredWords = dedupeWords(filteredWords);

      const resultPromises = filteredWords.map(async (word) => {
        let response = await fetchWordnetSynonims(word);
        synonimsPerWordList.push(response);
      });

      await Promise.all(resultPromises);

      // save to db

      res.status(200).json(synonimsPerWordList);
    }
  } catch (error) {
    res.status(500).json({ error: "An error ocurred" });
  } finally {
    res.end();
  }
});

const convertStringToArray = function (str) {
  return str.trim().split(" ");
};

const dedupeWords = function (words) {
  const uniqueOcurrences = [...new Set(words)];
  return uniqueOcurrences;
};

const removeExcludedWords = function (words, excludedWords) {
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

  const lookupPromise = wordnet.lookupAsync(word);
  const lookupResults = await lookupPromise;

  lookupResults.forEach(function (result) {
    wordInfo.synonyms_found += result.synonyms.length;
    wordInfo.synonims_list = wordInfo.synonims_list.concat(result.synonyms);
    //TODO: Add logic if synonim was prevously found in other word
  });

  return wordInfo;
}

module.exports = router;
