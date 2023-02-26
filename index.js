const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
//const fs = require('fs');
const checkWord = require('check-if-word'),
words = checkWord('en');

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res)  {
    res.sendFile(__dirname + "/public/index.html");
});
app.use(bodyParser.json());

app.post("/unscramble", async (req, res) => {
    //console.log("POST REQUEST RECEIVED");
    const text = req.body.data.text;
    let threeLetterWords = [];
    let fourLetterWords = [];
    let fiveLetterWords = [];
    let sixLetterWords = [];
    let allWords = [];

    // find all words with 3 letters
    function hasVowelOrY(word) {
        return /[aeiouy]/i.test(word);
        }

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            if (i == j) continue;
            for (let k = 0; k < text.length; k++) {
                if (i == k || j == k) continue;
                let word = text[i] + text[j] + text[k];
                if (hasVowelOrY(word)) allWords.push(word);
                
                
            }
        }
    }

    // find all words with 4 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            if (i == j) continue;
            for (let k = 0; k < text.length; k++) {
                if (i == k || j == k) continue;
                for (let l = 0; l < text.length; l++) {
                    if (i == l || j == l || k == l) continue;
                    let word = text[i] + text[j] + text[k] + text[l];
                    if (hasVowelOrY(word)) allWords.push(word);
                }
            }
        }
    }
    
    // find all words with 5 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            if (i == j) continue;
            for (let k = 0; k < text.length; k++) {
                if (i == k || j == k) continue;
                for (let l = 0; l < text.length; l++) {
                    if (i == l || j == l || k == l) continue;
                    for (let m = 0; m < text.length; m++) {
                        if (i == m || j == m || k == m || l == m) continue;
                        let word = text[i] + text[j] + text[k] + text[l] + text[m];
                        if (hasVowelOrY(word)) allWords.push(word);
                    }
                }
            }
        }
    }
    // find all words with 6 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            if (i == j) continue;
            for (let k = 0; k < text.length; k++) {
                if (i == k || j == k) continue;
                for (let l = 0; l < text.length; l++) {
                    if (i == l || j == l || k == l) continue;
                    for (let m = 0; m < text.length; m++) {
                        if (i == m || j == m || k == m || l == m) continue;
                        for (let n = 0; n < text.length; n++) {
                            if (i == n || j == n || k == n || l == n || m == n) continue;
                            let word = text[i] + text[j] + text[k] + text[l] + text[m] + text[n];
                            // if word doesn't have a vowel, skip it
                            if (hasVowelOrY(word)) allWords.push(word);
                            
                        }
                    }
                }
            }
        }
    }
    console.log("all words");
    console.log(allWords)
    console.log("end here!")

    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i].toLowerCase();
        if (words.check(word)) {
            if (word.length == 3 && !threeLetterWords.includes(word)) threeLetterWords.push(word);
            if (word.length == 4 && !fourLetterWords.includes(word)) fourLetterWords.push(word);
            if (word.length == 5 && !fiveLetterWords.includes(word)) fiveLetterWords.push(word);
            if (word.length == 6 && !sixLetterWords.includes(word)) sixLetterWords.push(word);
        }
  
    }
    console.log(threeLetterWords);
    console.log(fourLetterWords);
    console.log(fiveLetterWords);
    console.log(sixLetterWords);
    res.send({threeLetterWords, fourLetterWords, fiveLetterWords, sixLetterWords});
});
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function()  {
    console.log("Server is running on port 3000");
});

