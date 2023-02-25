function processLetters() {
    var text = document.getElementById("letterInput").value.trim();
    document.getElementById("letterInput").value = "";
    const data = {
        text: text
    }
    console.log(JSON.stringify({ data }));
    fetch('/unscramble', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
        })
        .then((response) => response.json())
        .then((data) => {
        
            
            $(`#3Letter tbody`).find('td').empty();
            $(`#4Letter tbody`).find('td').empty();
            $(`#5Letter tbody`).find('td').empty();
            $(`#6Letter tbody`).find('td').empty();

            // fill the table with the values from the data object
            threeLetterWords = data.threeLetterWords;
            fourLetterWords = data.fourLetterWords;
            fiveLetterWords = data.fiveLetterWords;
            sixLetterWords = data.sixLetterWords;


            if (threeLetterWords.length == 0) {
                $(`#3Letter tbody`).append(`<td>No words found</td>`);
            }
            if (fourLetterWords.length == 0) {
                $(`#4Letter tbody`).append(`<td>No words found</td>`);
            }
            if (fiveLetterWords.length == 0) {
                $(`#5Letter tbody`).append(`<td>No words found</td>`);
            }
            if (sixLetterWords.length == 0) {
                $(`#6Letter tbody`).append(`<td>No words found</td>`);
            }

            for (let i = 0; i < threeLetterWords.length; i++) {
                let table = $(`#3Letter tbody`);
                table.append(`<td>${threeLetterWords[i]}</td>`);
            }
            for (let i = 0; i < fourLetterWords.length; i++) {
                let table = $(`#4Letter tbody`);
                table.append(`<td>${fourLetterWords[i]}</td>`);
            }
            for (let i = 0; i < fiveLetterWords.length; i++) {
                let table = $(`#5Letter tbody`);
                table.append(`<td>${fiveLetterWords[i]}</td>`);
            }
            for (let i = 0; i < sixLetterWords.length; i++) {
                let table = $(`#6Letter tbody`);
                table.append(`<td>${sixLetterWords[i]}</td>`);
            }

        })
        .catch(error => {
            console.log(error);
        });
    
}