const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const fs = require('fs');
var checkWord = require('check-if-word'),
words = checkWord('en');

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res)  {
    res.sendFile(__dirname + "/public/index.html");
});
app.use(bodyParser.json());

app.post("/unscramble", async (req, res) => {
    console.log("POST REQUEST RECEIVED");
    var text = req.body.data.text;
    let threeLetterWords = [];
    let fourLetterWords = [];
    let fiveLetterWords = [];
    let sixLetterWords = [];
    let allWords = [];

    // find all words with 3 letters
    

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            if (i == j) continue;
            for (let k = 0; k < text.length; k++) {
                if (i == k || j == k) continue;
                let word = text[i] + text[j] + text[k];
                allWords.push(word);
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
                    allWords.push(word);
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
                        allWords.push(word);
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
                            allWords.push(word);
                        }
                    }
                }
            }
        }
    }

   
    console.log("all words");
    console.log(allWords)
    console.log("end here!")

    // copy the contents of the array into allWords.txt
    // fs.writeFile('allWords.txt', allWords.toString(), function (err) {
    //     if (err) throw err;
    //     console.log('Array has been pasted into the file!');
    //     });
    

    // clear the contents of the file wordTest.txt
    // fs.writeFile('wordTest.txt', "", function (err) {
    //     if (err) throw err;
    //     //console.log('File has been cleared!');
    //     });
    // remove the word if it is not in the dictionary
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i].toLowerCase();
        // var url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
        // //console.log(url)
        // await axios.get(url)
        // .then(response => {
        //     if (response.data.title === "No Definitions Found") {
        //         console.log("ERRORING")
                
        //     }
        //     else {
        //         if (word.length == 3 && !threeLetterWords.includes(word)) threeLetterWords.push(word);
        //         if (word.length == 4 && !fourLetterWords.includes(word)) fourLetterWords.push(word);
        //         if (word.length == 5 && !fiveLetterWords.includes(word)) fiveLetterWords.push(word);
        //         if (word.length == 6 && !sixLetterWords.includes(word)) sixLetterWords.push(word);
        //     }
            
        // })
        // .catch(error => {
        //     // paste the word into the file wordTest.txt followed by a newline
        //     fs.appendFile('wordTest.txt', "\n"+ url , function (err) {
        //         if (err) throw err;
        //         //console.log('Word has been appended to the file!');
        //         });
            
        // });
        if (words.check(word)) {
            if (word.length == 3 && !threeLetterWords.includes(word)) threeLetterWords.push(word);
            if (word.length == 4 && !fourLetterWords.includes(word)) fourLetterWords.push(word);
            if (word.length == 5 && !fiveLetterWords.includes(word)) fiveLetterWords.push(word);
            if (word.length == 6 && !sixLetterWords.includes(word)) sixLetterWords.push(word);
        }

        // watch for error

        
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
