window.onload = function() {
  startLinks(); //add listeners to the buttons
  let timeout = null;
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
  /* ---------------------------------------------------------------
  view elements which going to recieve new content based on results.
   ------------------------------------------------------------------*/
  let passwordField = document.getElementById("password"); //input text field
  let strengthBox = document.getElementById("strength"); //password strength title
  let feedbackBox = document.getElementById("feedback"); //suggessions
  let hackedOutput = document.getElementById("hackedOutput"); //Number of times the password got leaked
  let crackTimeOutput = document.getElementById("crackTimeOutput"); // crack time in humain format

  /* -------------------------------------
   toogle the visibility of these elements
   ---------------------------------------*/
  let tips = document.getElementById("tips"); //Tips section
  let box3 = document.getElementById("box-3"); // box 3 containing the query results.

  /* -------------------------------------------------
    imgs chich going to change colors based on results
   ---------------------------------------------------*/
  let logo = document.getElementById("logo");
  let emoticonBox = document.getElementById("emoticon");
  let icon_skull = document.getElementById("icon-skull");
  let icon_chain = document.getElementById("icon-chain");

  //reset the view to it's initial state
  function initView() {
    strengthBox.innerHTML = "PASSECURE";
    emoticonBox.src = "images/emoticons/Main-logo.png";
    logo.src = "/images/logos/logo-header-MAIN.svg";
    feedbackBox.innerHTML = "Enter a password to verify it's strength.";

    /*all elements use the (--result-color) variable in css
     reset this variable to the main color(blue)*/
    document.documentElement.style.setProperty(
      "--result-color",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--main-color"
      )
    );
    hackedOutput.innerHTML = "";
    crackTimeOutput.innerHTML = "";
    tips.hidden = false;
    box3.style.display = "none";
  }
  /* -----------------------------------------------------------------
    hash password function using the SHA1 js file.
    to use the HIBP API we need the first 5 characters
    to append to the request and the remaining string for comparaison
   --------------------------------------------------------------------*/
  function hashPass(password) {
    let hash = sHa1(password);
    let firstFive = hash.substr(0, 5).toUpperCase();
    let reminder = hash.substr(5).toUpperCase();
    return { firstFive, reminder };
  }

  /* ---------------------------------------------------------------------------------
    This function takes a multiple line string with 2 values in each row and
    returns an array of objects [{hash : "Remaining Hash" , occ : "Occurences"}]
   ----------------------------------------------------------------------------------*/
  function processText(text) {
    let newArray = [];
    text.split("\n").forEach(row => {
      let objRow = {};
      splittedRow = row.split(":");
      objRow.hash = splittedRow[0];
      objRow.occ = splittedRow[1];
      newArray.push(objRow);
    });
    return newArray;
  }

  /* -------------------------------------------------------
    This function takes an array of password objects (arr)
    and looks for a string (reminder)
  --------------------------------------------------------*/
  function passwordFound(arr, reminder) {
    result = {};
    result.found = false;
    result.occ = 0;
    for (elem of arr) {
      if (elem.hash == reminder) {
        result.found = true;
        result.occ = elem.occ;
        break;
      }
    }
    return result;
  }

  /* -----------------------------------------------------
    Here, where all the the UI updating happens, based on
    the result of the other functions.
  --------------------------------------------------------*/
  function processFetchResult(text, reminder, result) {
    let warningText = "";
    let foundObj = passwordFound(processText(text), reminder);

    box3.style.display = "flex";
    tips.hidden = true;

    let score = 0;
    if (foundObj.found) {
      icon_skull.src = "/images/skull-icons/icon-skull-0.png";
      hackedOutput.innerHTML = foundObj.occ;
      document.documentElement.style.setProperty(
        "--hacked-color",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--terrible-color"
        )
      );
      warningText =
        "Hackers already have this password in their dictionaries. do not use this at all!";
    } else {
      score = result.score;
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
        " Congratulations! Your password seems very strong. Now be careful where to save it.";
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
    document.documentElement.style.setProperty("--result-color", colors[score]);
    emoticonBox.src = `images/emoticons/smily-${strength[score]}.png`;
    logo.src = `images/logos/logo-header-${strength[score]}.svg`;
    icon_chain.src = `/images/chain-icons/icon-chain-${strength[score]}.png`;
  }

  /* -----------------------------------------------------
    This function calls the HIBP APi and extracts results
    from the Dropbox zxcvbn library, then calls the function
    that updates the UI with the results.
  --------------------------------------------------------*/
  function processPassword() {
    let { firstFive, reminder } = hashPass(passwordField.value);
    let result = zxcvbn(passwordField.value);

    fetch(`https://api.pwnedpasswords.com/range/${firstFive}`)
      .then(response => response.text())
      .then(text => {
        processFetchResult(text, reminder, result);
      })
      .catch(err => {
        console.error(err);
      });
  }

  /* ----------------------------------------------------------
    Main event listener, waits for 300ms to minimise Api calls
    and either resets the view (if input is empty) or process
    the entred password.
  -------------------------------------------------------------*/
  passwordField.addEventListener("keyup", function(element) {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <300ms>
    clearTimeout(timeout);
    // Make a new timeout set to go off in <300ms>
    timeout = setTimeout(function() {
      if (passwordField.value == "") initView();
      else processPassword();
    }, 300);
  });
};
