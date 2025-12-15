document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOVIE DATA
  ================================ */
  const movies = [
    {
      key: "interstellar",
      title: "Interstellar",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
      key: "dhadak2",
      title: "Dhadak 2",
      rating: 7.5,
      poster: "posters/Dhadak2poster.jpg"
    },
    {
      key: "myfault",
      title: "My Fault",
      rating: 8.4,
      poster: "posters/myfault.jpg"
    },
    {
      key: "500days",
      title: "500 Days of Summer",
      rating: 9.0,
      poster: "posters/500 days of summer.jpg"
    },
    {
      key: "readyplayerone",
      title: "Ready Player One",
      rating: 8.2,
      poster: "posters/readyplayer.jpg"
    }
  ];

  /* ===============================
     ELEMENTS
  ================================ */
  const grid = document.getElementById("movies");
  const searchInput = document.getElementById("searchInput");
  const hero = document.getElementById("hero");
  const heroTitle = document.getElementById("heroTitle");
  const heroPlay = document.getElementById("heroPlay");
  const dotsBox = document.getElementById("dots");

  /* ===============================
     LOADING SKELETON
  ================================ */
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("div");
    s.className = "skeleton";
    grid.appendChild(s);
  }

  /* ===============================
     NAVIGATION
  ================================ */
  function goToPlayer(movie) {
    window.location.href =
      `player.html?movie=${movie.key}&title=${encodeURIComponent(movie.title)}`;
  }

  /* ===============================
     WATCHLIST
  ================================ */
  function addToWatchlist(movie) {
    let list = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!list.find(m => m.key === movie.key)) {
      list.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(list));
      alert("Added to Watchlist");
    }
  }

  /* ===============================
     RENDER MOVIES
  ================================ */
  function renderMovies(list) {
    grid.innerHTML = "";

    list.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      card.innerHTML = `
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="overlay">
            <button class="play-btn play">▶ Play</button>
            <button class="play-btn add">＋</button>
          </div>
          <span class="rating">⭐ ${movie.rating}</span>
        </div>
        <h3>${movie.title}</h3>
      `;

      // play
      card.querySelector(".play").onclick = (e) => {
        e.stopPropagation();
        goToPlayer(movie);
      };

      // add to watchlist
      card.querySelector(".add").onclick = (e) => {
        e.stopPropagation();
        addToWatchlist(movie);
      };

      // click anywhere
      card.onclick = () => goToPlayer(movie);

      grid.appendChild(card);
    });
  }

  /* ===============================
     SEARCH
  ================================ */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      const filtered = movies.filter(m =>
        m.title.toLowerCase().includes(q)
      );
      renderMovies(filtered);
    });
  }

  /* ===============================
     HERO SLIDER
  ================================ */
  let current = 0;

  function buildDots() {
    dotsBox.innerHTML = "";
    movies.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "dot" + (i === 0 ? " active" : "");
      dotsBox.appendChild(d);
    });
  }

  function updateHero() {
    const m = movies[current];

    hero.style.backgroundImage = `
      linear-gradient(to right, rgba(2,6,23,0.9), rgba(2,6,23,0.25)),
      url("${m.poster}")
    `;

    heroTitle.textContent = m.title;
    heroPlay.onclick = () => goToPlayer(m);

    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });

    current = (current + 1) % movies.length;
  }

  /* ===============================
     INIT
  ================================ */
  buildDots();
  updateHero();
  setInterval(updateHero, 4000);

  setTimeout(() => {
    renderMovies(movies);
  }, 700);

});








