const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");

app.use(express.static(__dirname + '/templates'));

app.get("/", function(req, res)  {
    res.sendFile(__dirname + "/templates/index.html");
});
app.use(bodyParser.json());

app.post("/unscramble", async (req, res) => {
    var text = req.body.data.text;
    let threeLetterWords = [];
    let fourLetterWords = [];
    let fiveLetterWords = [];
    let sixLetterWords = [];
    let allWords = [];

    // find all words with 3 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 1; j < text.length; j++) {
            for (let k = j + 1; k < text.length; k++) {
                let word = text[i] + text[j] + text[k];
                allWords.push(word);
            }
        }
    }

    // find all words with 4 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 1; j < text.length; j++) {
            for (let k = j + 1; k < text.length; k++) {
                for (let l = k + 1; l < text.length; l++) {
                    let word = text[i] + text[j] + text[k] + text[l];
                    allWords.push(word);
                }
            }
        }
    }

    // find all words with 5 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 1; j < text.length; j++) {
            for (let k = j + 1; k < text.length; k++) {
                for (let l = k + 1; l < text.length; l++) {
                    for (let m = l + 1; m < text.length; m++) {
                        let word = text[i] + text[j] + text[k] + text[l] + text[m];
                        allWords.push(word);
                    }
                }
            }
        }
    }

    // find all words with 6 letters
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 1; j < text.length; j++) {
            for (let k = j + 1; k < text.length; k++) {
                for (let l = k + 1; l < text.length; l++) {
                    for (let m = l + 1; m < text.length; m++) {
                        for (let n = m + 1; n < text.length; n++) {
                            let word = text[i] + text[j] + text[k] + text[l] + text[m] + text[n];
                            allWords.push(word);
                        }
                    }
                }
            }
        }
    }
    // remove the word if it is not in the dictionary
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        //let response = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                if (word.length == 3) threeLetterWords.push(word);
                if (word.length == 4) fourLetterWords.push(word);
                if (word.length == 5) fiveLetterWords.push(word);
                if (word.length == 6) sixLetterWords.push(word);
        }
        })
        .catch(error => console.error(error));
        
    }
    console.log(threeLetterWords);
    console.log(fourLetterWords);
    console.log(fiveLetterWords);
    console.log(sixLetterWords);
    res.send({threeLetterWords, fourLetterWords, fiveLetterWords, sixLetterWords});
        

    

});

app.listen(3000);
