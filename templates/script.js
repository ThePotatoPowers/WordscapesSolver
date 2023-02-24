function processLetters() {
    var text = document.getElementById("letterInput").value;
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
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    
}