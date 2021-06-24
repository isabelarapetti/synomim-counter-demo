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
        let result = await fetchWordnetSynonims(word, filteredWords);

        if (!isSynonimOfPreviousWord(synonimsPerWordList, word)) {
          synonimsPerWordList.push(result);
        }
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

async function fetchWordnetSynonims(word, wordsList) {
  let wordInfo = {
    word: word,
    synonyms_found: 0,
    synonims_list: [],
  };
  let fetchedSynonims = [];

  const wordnet = new WordNet();

  const lookupPromise = wordnet.lookupAsync(word);
  const lookupResults = await lookupPromise;

  lookupResults.forEach(function (result) {
    fetchedSynonims = fetchedSynonims.concat(result.synonyms);
  });

  wordInfo.synonims_list = removeExcludedWords(
    dedupeWords(fetchedSynonims),
    word
  );
  wordInfo.synonyms_found = wordInfo.synonims_list.length;

  return wordInfo;
}

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

const isSynonimOfPreviousWord = function (wordsList, newWord) {
  let isSynonimOfPreviousWord = false;

  //foreach in array of previous synonim lookups
  wordsList.map((word) => {
    // if synonim of last lookup is equal to new word
    if (word.synonims_list.includes(newWord)) {
      // add to previous element count
      word.synonyms_found++;
      // set to true so  its not considered a new entry
      isSynonimOfPreviousWord = true;
    }
  });

  return isSynonimOfPreviousWord;
};

module.exports = router;
