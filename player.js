const params = new URLSearchParams(window.location.search);
const key = params.get("movie");
const title = params.get("title");

const map = {
  interstellar:"1Ff3AizvB5x_xTxXuIk4XSIV0CEr4EkQS",
  dhadak2:"1tWfTM22s1CWCMiex3ht5ftSgvyRNkDxu",
  myfault:"1Wm8zTfwiqEhR8M2W7b2HLj3LsyW2TDj5",
  readyplayerone:"1K6pSNhKLKooixXttxVpvz4NHD0Ypn7e1",
  "500days":"1ODJbzE0iLkBM7CWJLuC40y402idPZg2C"
};

document.getElementById("movieTitle").innerText = title || "Movie";

if(map[key]){
  document.getElementById("drivePlayer").src =
    `https://drive.google.com/file/d/${map[key]}/preview`;
}else{
  document.body.innerHTML="<h1 style='text-align:center'>Movie not found</h1>";
}

function goBack(){
  window.location.href="index.html";
}
const video = document.querySelector("video");
const movieKey = new URLSearchParams(location.search).get("movie");
video.currentTime = localStorage.getItem(storageKey) || 0;

video.addEventListener("timeupdate", () => {
  localStorage.setItem(storageKey, video.currentTime);
});


if (video && movieKey) {
  // resume
  const savedTime = localStorage.getItem("progress_" + movieKey);
  if (savedTime) video.currentTime = savedTime;

  // save progress
  video.addEventListener("timeupdate", () => {
    localStorage.setItem("progress_" + movieKey, video.currentTime);
  });
}
