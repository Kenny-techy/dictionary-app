// Get DOM elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const infoText = document.querySelector(".info-text");
const wordContainer = document.querySelector(".word-container");

let audio;

// Listen for click event of the search button
searchBtn.addEventListener("click", () => {
  // Check if seach input value is valid
  if (searchInput.value) {
    fetchAPI(searchInput.value);
  } else {
    // Alert the user if the input is empty
    alert("You must enter a word");
  }
});

// Fetches data from an API
async function fetchAPI(word) {
  try {
    // Store API url 
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // Get the data from the API 
    const result = await fetch(url).then((res) => res.json());
    // Display information about the word searched
    displayWord(result);
  } catch (error) {
    console.error(error);
  }
}

// Displays the word the user searched for
function displayWord(result) {
  // Gets the word
  let wordText = result[0].word;
  wordText = wordText.charAt(0).toUpperCase() + wordText.slice(1);

  // Gets the word's definition
  const definition = result[0].meanings[0].definitions[0].definition;

  // Gets the word type (e.g. verb)
  const wordType = result[0].meanings[0].partOfSpeech;

  // Gets an example sentence that includes the word
  const example = result[0].meanings[0].definitions[0].example || "No example found";

  // Gets the audio for the word
  audio = new Audio(result[0].phonetics[0].audio);

  // Updates the page to show the word's defintion, example and pronunication 
  wordContainer.innerHTML = `
    <div class="header">
      <div>
        <h2 class="word-text">${wordText}</h2>
      </div>
      <button id="playPronunciationBtn">
        <i class="fa-solid fa-volume-high"></i>
      </button>
      </div>
        <p class="word-type">${wordType}</p>
        <p class="word-definition">${definition}</p>
      <div class="example-sentence-container">
        <p class="example-sentence">${example}</p>
      </div>
  `;
  // Listens for a click event of the play pronunication button
  document.getElementById("playPronunciationBtn").addEventListener("click", () => {
    // Plays the audio fetched 
    audio.play();
  });
}
