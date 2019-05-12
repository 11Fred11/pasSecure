window.onload = function() {
  var strength = {
    0: "Terrible",
    1: "Bad",
    2: "Meeh.",
    3: "Good",
    4: "Strong"
  };
  let go = document.getElementById("go");
  let password = document.getElementById("password");
  let meter = document.getElementById("password-strength-meter");
  let textBox = document.getElementById("password-strength-text");

  function hashPass(password) {
    let hash = sHa1(password);
    let firstFive = hash.substr(0, 5).toUpperCase();
    let reminder = hash.substr(5).toUpperCase();
    return { firstFive, reminder };
  }
  password.addEventListener("input", function(element) {
    if (password.value == "") {
      meter.hidden = true;
      textBox.innerHTML = "";
    } else {
      meter.hidden = false;
      let result = zxcvbn(password.value);
      console.log(result.score);
      if (result.score == 0) score = 1;
      else score = result.score;
      meter.value = score;
      textBox.innerHTML =
        "Strength: " +
        "<strong>" +
        strength[result.score] +
        "</strong>" +
        "<span class='feedback'>" +
        result.feedback.warning +
        " " +
        result.feedback.suggestions +
        "</span";
    }

    //let { firstFive, reminder } = hashPass(password.value);
    //console.log(firstFive, reminder);

    /* fetch(`https://api.pwnedpasswords.com/range/${firstFive}`)
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
        if (found) {
          text1.innerHTML = `Found ! : ${occ} times`;
          meter.hidden = false;
          meter.value = "1";
        } else {
          text1.innerHTML = "Password Safe :) ";
          meter.hidden = false;
          meter.value = "4";
        }
      })
      .catch(err => console.log(err)); */
  });
};
