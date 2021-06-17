const jokeBtn = document.getElementById("get-joke");
const jokeBox = document.getElementById("joke-box");
const beardBox = document.getElementById("beard-box");

const getJoke = () => {
    const init = {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
      };
    fetch("https://icanhazdadjoke.com", init)
    .then(response => response.json())
    .then(data => jokeBox.textContent = data.joke);
}

jokeBtn.addEventListener("click", getJoke);

getJoke();