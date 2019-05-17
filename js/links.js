/* add all clicks events here */
//clickable icons
function startLinks() {
  let linkedin_link = document.getElementById("linkedin-link");
  let github_link = document.getElementById("github-link");
  let closeIcon = document.getElementById("closeIcon");
  let aboutIcon = document.getElementById("aboutIcon");

  /*Close window listener */
  closeIcon.addEventListener("click", function(element) {
    window.close();
  });

  /*open github page in seperate tab*/
  github_link.addEventListener("click", function(element) {
    chrome.tabs.create({ url: "https://github.com/10Fred10", active: false });
  });

  /*open linkedin page in seperate tab */
  linkedin_link.addEventListener("click", function(element) {
    chrome.tabs.create({
      url: "https://www.linkedin.com/in/fredhm/",
      active: false
    });
  });
  /*open linkedin page in seperate tab */
  aboutIcon.addEventListener("click", function(element) {
    chrome.tabs.create({
      url: "https://imgs.xkcd.com/comics/password_strength.png",
      active: false
    });
  });
}
