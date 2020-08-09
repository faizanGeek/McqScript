const express = require('express');
const xlsxFile = require('read-excel-file/node');
var WordExtractor = require('word-extractor');
const Question = require('../models/questions');
const router = express.Router();

// xls file reader
xlsxFile('./MCQ_data.xlsx').then(async (rows) => {
  console.table(rows);
  for (i in rows) {
    let name,
      options = [],
      correctOpt;
    for (j in rows[i]) {
      if (j == 0) {
        name = rows[i][j];
      } else {
        if (j == 5) {
          correctOpt = rows[i][j];
        } else {
          options.push(rows[i][j]);
        }
      }
    }
    const question = new Question({
      name: name,
      options: options,
      correctOpt: correctOpt,
    });
    try {
      let newQuestion = await question.save();
    } catch (err) {
      console.log(err, 'ERROR FOUND IN SAVING DATA INTO DATABASE');
    }
  }
});

// word file reader

var extractor = new WordExtractor();
var extracted = extractor.extract('MCQ_data.doc');
extracted.then(async function (doc) {
  console.log(doc.getBody());
  let text = doc.getBody().split('\n');
  let name,
    options = [],
    correctOpt;
  for (i in text) {
    if (text[i] != '') {
      if (i % 6 == 0) name = text[i];
      else {
        if (i % 6 == 5) {
          correctOpt = text[i];
          const question = new Question({
            name: name,
            options: options,
            correctOpt: correctOpt,
          });
          try {
            let newQuestion = await question.save();
          } catch (err) {
            console.log(err, 'ERROR FOUND IN SAVING DATA INTO DATABASE');
          }
          (name = ''), (options = []), (correctOpt = '');
        } else {
          options.push(text[i]);
        }
      }
    }
  }
});

module.exports = router;
