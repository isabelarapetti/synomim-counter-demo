const express = require("express");
const router = express.Router();
var WordNet = require("node-wordnet");

// test
// router.get("/", (req, res) => {
//   res.send("api worksssss");
// });

router.get("/parse", async (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      //turn string into array list
      const words = convertStringToArray(text);
      console.log(words);
      const filteredWords = removeExcludedWords(words, excludedWords);

      console.log(filteredWords);
      //response = await getSynonimsPerWordList(filteredWords);
      let synonimsPerWordList = [];

      await Promise.all(
        filteredWords.map(async (word) => {
          console.log("promise", word);
          let response = await fetchWordnetSynonims(wordnet, word);
          synonimsPerWordList.push(response);
        })
      );

      console.log(synonimsPerWordList, " ----------------resultadooo -------");
      res.status(200).json(synonimsPerWordList);
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

module.exports = router;

// async function getSynonimsPerWordList(filteredWords) {
//   let synonimsPerWordList = [];

//   await Promise.all(
//     filteredWords.map(async (word) => {
//       let response = await fetchWordnetSynonims(wordnet, word);
//       synonimsPerWordList.push(response);
//     })
//   );
// }

async function fetchWordnetSynonims(word) {
  let synonimCount = 0;
  let synonimsList = [];

  console.log("pepe");
  const wordnet = new WordNet();

  let response = await wordnet.lookup(word, function (results) {
    console.log("lookup");
    results.forEach(function (result) {
      synonimCount += result.synonyms.length;
      console.log("length", result.synonyms.length);
      synonimsList = result.synonyms;

      //TODO: Add dedupe logic if synonim was prevously found in other word
    });

    var wordInfo = {
      word: word,
      synonyms_found: synonimCount,
      synonims_list: synonimsList,
    };

    console.log(wordInfo, "wordInfo");
    return wordInfo;
  });
  return response;
}
//   wordnet.lookup(word, function (results) {
//     results.forEach(function (result) {
//       synonimCount += result.synonyms.length;
//     });
//     response.push({ word: word, synonyms_found: synonimCount });
//   });
//   return response;
// });

// const scanedTextTest = [
//   { word: "Hydrogen", synonyms_found: 1 },
//   { word: "Helium", synonyms_found: 2 },
//   { word: "Lithium", synonyms_found: 3 },
//   { word: "Beryllium", synonyms_found: 4 },
//   { word: "Boron", synonyms_found: 5 },
//   { word: "Carbon", synonyms_found: 6 },
//   { word: "Nitrogen", synonyms_found: 7 },
//   { word: "Oxygen", synonyms_found: 8 },
//   { word: "Fluorine", synonyms_found: 9 },
//   { word: "Neon", synonyms_found: 10 },
//];
