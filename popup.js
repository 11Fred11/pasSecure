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
  let passBox = document.getElementById("password-found-text");

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
      passBox.innerHTML = "";
    } else {
      meter.hidden = false;
      let { firstFive, reminder } = hashPass(password.value);
      let result = zxcvbn(password.value);
      console.log(result);
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
          if (found) {
            passBox.innerHTML = `This password matches : ${occ} HACKED accounts`;
            meter.hidden = false;
            meter.value = "5";
          } else {
            if (result.score == 0) score = 1;
            else score = result.score;
            passBox.innerHTML = "This Password didn't match any hacked account";
            meter.hidden = false;
            meter.value = score;
          }
          let newSuggestion = "";
          if (result.score == 4) {
            newSuggestion =
              " Congratulations! Your password seems very strong. Now careful where to save it.";
          } else
            newSuggestion =
              "<span class='feedback'>" +
              result.feedback.warning +
              " " +
              result.feedback.suggestions +
              "</span";
          textBox.innerHTML =
            "Strength: " +
            "<strong>" +
            strength[result.score] +
            "</strong> " +
            newSuggestion;
        })
        .catch(err => console.log(err));
    }
  });
};
