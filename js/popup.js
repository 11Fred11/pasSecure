window.onload = function() {
  let strength = {
    0: "TERRIBLE",
    1: "BAD",
    2: "MEEH.",
    3: "GOOD",
    4: "STRONG"
  };
  let colors = {
    0: "#ff565e",
    1: "#ff8347",
    2: "#fdcf24",
    3: "#9dd773",
    4: "#62c966"
  };
  let linkedin_link = document.getElementById("linkedin-link");
  let github_link = document.getElementById("github-link");
  let closeIcon = document.getElementById("closeIcon");
  let passwordField = document.getElementById("password");
  let strengthBox = document.getElementById("strength");
  let emoticonBox = document.getElementById("emoticon");
  let feedbackBox = document.getElementById("feedback");
  let hackedOutput = document.getElementById("hackedOutput");
  let crackTimeOutput = document.getElementById("crackTimeOutput");
  let left_span = document.getElementById("left-span");
  let right_span = document.getElementById("right-span");
  let times = document.getElementById("times");
  let logo = document.getElementById("logo");
  let icon_skull = document.getElementById("icon-skull");
  let icon_chain = document.getElementById("icon-chain");

  function initView() {
    strengthBox.innerHTML = "PASSECURE";
    emoticonBox.src = "images/emoticons/Main-logo.png";
    logo.src = "/images/logos/logo-header-MAIN.svg";
    feedbackBox.innerHTML = "Enter a password to verify it's strength.";
    document.documentElement.style.setProperty(
      "--result-color",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--main-color"
      )
    );
    hackedOutput.innerHTML = "";
    crackTimeOutput.innerHTML = "";
    left_span.hidden = true;
    right_span.hidden = true;
    times.hidden = true;
  }

  function hashPass(password) {
    let hash = sHa1(password);
    let firstFive = hash.substr(0, 5).toUpperCase();
    let reminder = hash.substr(5).toUpperCase();
    return { firstFive, reminder };
  }
  var timeout = null;
  closeIcon.addEventListener("click", function(element) {
    window.close();
  });
  github_link.addEventListener("click", function(element) {
    chrome.tabs.create({ url: "https://github.com/10Fred10", active: false });
  });
  linkedin_link.addEventListener("click", function(element) {
    chrome.tabs.create({
      url: "https://www.linkedin.com/in/fredhm/",
      active: false
    });
  });
  passwordField.addEventListener("keyup", function(element) {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 300ms
    timeout = setTimeout(function() {
      if (passwordField.value == "") {
        initView();
      } else {
        let warningText = "";
        let { firstFive, reminder } = hashPass(passwordField.value);
        let result = zxcvbn(passwordField.value);
        console.log(result.feedback);

        fetch(`https://api.pwnedpasswords.com/range/${firstFive}`)
          .then(response => response.text())
          .then(text => {
            let newArray = [];
            text.split("\n").forEach(row => {
              let objRow = {};
              splittedRow = row.split(":");
              objRow.hash = splittedRow[0];
              objRow.occ = splittedRow[1];
              newArray.push(objRow);
            });
            let found = false;
            let occ = 0;
            for (elem of newArray) {
              if (elem.hash == reminder) {
                found = true;
                occ = elem.occ;
                break;
              }
            }
            left_span.hidden = false;
            right_span.hidden = false;
            times.hidden = false;
            let score = 0;
            if (found) {
              icon_skull.src = "/images/skull-icons/icon-skull-0.png";
              hackedOutput.innerHTML = occ;
              document.documentElement.style.setProperty(
                "--hacked-color",
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--terrible-color"
                )
              );
              warningText =
                "This password had been seesed buy hackers in the past. make sure you change it!";
            } else {
              if (result.score == 0) score = 1;
              else score = result.score;
              icon_skull.src = "/images/skull-icons/icon-skull-1.png";
              hackedOutput.innerHTML = "0";
              document.documentElement.style.setProperty(
                "--hacked-color",
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--strong-color"
                )
              );
            }
            if (result.score == 4) {
              warningText =
                " Congratulations! Your password seems very strong. Now careful where to save it.";
            } else
              warningText =
                result.feedback.warning == ""
                  ? result.feedback.suggestions
                  : result.feedback.warning;
            strengthBox.innerHTML = strength[score];
            feedbackBox.innerHTML = warningText;
            let crackTime =
              result.crack_times_display.online_no_throttling_10_per_second;
            if (crackTime == "less than a second") crackTime = "Instantly";
            crackTimeOutput.innerHTML = crackTime;
            document.documentElement.style.setProperty(
              "--result-color",
              colors[score]
            );
            emoticonBox.src = `images/emoticons/smily-${strength[score]}.png`;
            logo.src = `images/logos/logo-header-${strength[score]}.svg`;
            icon_chain.src = `/images/chain-icons/icon-chain-${
              strength[score]
            }.png`;
          })
          .catch(err => console.error(err));
      }
    }, 300);
  });
};
