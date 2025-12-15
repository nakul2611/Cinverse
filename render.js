document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     MOVIE DATA
  =============================== */
  const movies = [
    {
      id: "interstellar",
      title: "Interstellar",
      rating: 8.6,
      poster: "posters/interstellar.jpg"
    },
    {
      id: "dhadak2",
      title: "Dhadak 2",
      rating: 7.5,
      poster: "posters/Dhadak2poster.jpg"
    },
    {
      id: "myfault",
      title: "My Fault",
      rating: 8.4,
      poster: "posters/myfault.jpg"
    },
    {
      id: "readyplayerone",
      title: "Ready Player One",
      rating: 8.2,
      poster: "posters/readyplayer.jpg"
    },
    {
      id: "500days",
      title: "500 Days of Summer",
      rating: 9.0,
      poster: "posters/500 days of summer.jpg"
    }
  ];

  const container = document.getElementById("movies");
  const searchInput = document.getElementById("searchInput");

  /* ===============================
     RENDER MOVIES
  =============================== */
  function renderMovies(list) {
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = `<p style="color:#aaa">No movies found</p>`;
      return;
    }

    list.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      card.innerHTML = `
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="overlay">
            <button class="play-btn">▶ Play</button>
            <button class="watch-btn">＋</button>
          </div>
          <span class="rating">⭐ ${movie.rating}</span>
        </div>
        <h3>${movie.title}</h3>
      `;

      // Play button
      card.querySelector(".play-btn").onclick = (e) => {
        e.stopPropagation();
        window.location.href = `player.html?movie=${movie.id}&title=${encodeURIComponent(movie.title)}`;
      };

      // Watchlist button
      card.querySelector(".watch-btn").onclick = (e) => {
        e.stopPropagation();
        addToWatchlist(movie);
      };

      // Card click
      card.onclick = () => {
        window.location.href = `player.html?movie=${movie.id}&title=${encodeURIComponent(movie.title)}`;
      };

      container.appendChild(card);
    });
  }

  /* ===============================
     SEARCH
  =============================== */
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = movies.filter(m =>
      m.title.toLowerCase().includes(query)
    );
    renderMovies(filtered);
  });

  /* ===============================
     HERO SLIDER
  =============================== */
  const hero = document.getElementById("hero");
  const heroTitle = document.getElementById("heroTitle");
  const heroPlay = document.getElementById("heroPlay");
  const dotsContainer = document.getElementById("dots");

  let current = 0;

  dotsContainer.innerHTML = "";
  movies.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateHero() {
    const movie = movies[current];

    hero.style.backgroundImage = `
      linear-gradient(to right, rgba(2,6,23,0.9), rgba(2,6,23,0.2)),
      url("${movie.poster}")
    `;

    heroTitle.textContent = movie.title;

    heroPlay.onclick = () => {
      window.location.href = `player.html?movie=${movie.id}&title=${encodeURIComponent(movie.title)}`;
    };

    dots.forEach(dot => dot.classList.remove("active"));
    dots[current].classList.add("active");

    current = (current + 1) % movies.length;
  }

  setInterval(updateHero, 4500);
  updateHero();

  /* ===============================
     INIT
  =============================== */
  renderMovies(movies);
});

/* ===============================
   WATCHLIST (LOCAL STORAGE)
================================ */
function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.find(m => m.id === movie.id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${movie.title} added to Watchlist`);
  } else {
    alert("Already in Watchlist");
  }
}









