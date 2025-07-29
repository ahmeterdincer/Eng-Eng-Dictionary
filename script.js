const wordInput = document.getElementById('word');
const button = document.querySelector('button');
const translatedDiv = document.getElementById('translatedDiv');
const title = document.getElementById('title');
const meaning = document.getElementById('meaning');
const audio = document.getElementById('audio');

async function fetchApi() {
  translatedDiv.style.display = 'none';
  const getWord = wordInput.value.trim();

  if (getWord === "") {
    alert("Please enter a word to translate");
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${getWord}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Hatası: ${res.status}`);
    }

    const result = await res.json();

    if (result.title) {
      alert("Kelime bulunamadı.");
      return;
    }

    translatedDiv.style.display = 'block';
    title.textContent = result[0].word;
    meaning.textContent = result[0].meanings[0].definitions[0].definition;
    audio.src = result[0].phonetics[0]?.audio || "";
    audio.style.display = audio.src ? "inline" : "none";

  } catch (error) {
    console.error("Hata oluştu:", error);
    alert("Bir hata oluştu: " + error.message);
  }
}

button.addEventListener('click', fetchApi);
