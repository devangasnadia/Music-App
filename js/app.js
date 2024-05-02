// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

function createArtistButtons() {
    const menu = document.getElementById("menu");
  
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => showSongsForArtist(artist));
      menu.appendChild(button);
    });
  }

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.alt = "Song Image";
    songImg.classList.add("card-image");
    card.appendChild(songImg);
  
    const cardTitle = document.createElement("h6");
    cardTitle.textContent = song.title;
    cardTitle.classList.add("card-title");
    card.appendChild(cardTitle);
  
    const yearRecorded = document.createElement("span");
    yearRecorded.textContent = song.year;
    yearRecorded.classList.add("year-recorded");
    card.appendChild(yearRecorded);
  
    const duration = document.createElement("span");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    duration.classList.add("duration");
    card.appendChild(duration);
  
    card.addEventListener("click", () => {
      window.open(song.youtubeUrl, "_blank");
    });
  
    return card;
  }
  
  function createSocialLinks(artist) {
    const socialLinksContainer = document.createElement("div");
    socialLinksContainer.classList.add("social-links");
  
    artist.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.name;
      anchor.classList.add("social-link");
      socialLinksContainer.appendChild(anchor);
    });
  
    return socialLinksContainer;
  }
  
  function showSongsForArtist(artist) {
    const selectedArtistElement = document.getElementById("selected-artist");
    selectedArtistElement.textContent = artist.name;
  
    const socialLinksContainer = createSocialLinks(artist);
    const linksContainer = document.querySelector(".social-links");
    linksContainer.innerHTML = ""; 
    linksContainer.appendChild(socialLinksContainer);
  
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";
  
    const filteredSongs = songs.filter((song) => song.artistId === artist.id && !song.flagged);
  
    filteredSongs.forEach((song) => {
      const songCard = createSongCard(song);
      cardContainer.appendChild(songCard);
    });
  }
  
  window.addEventListener("load", () => {
    createArtistButtons();
    const defaultArtist = artists[0];
    showSongsForArtist(defaultArtist);
  });
  
