window.onload = function() {
  let go = document.getElementById("go");
  function hashPass(password) {
    let hash = sHa1(password);
    let firstFive = hash.substr(0, 5).toUpperCase();
    let reminder = hash.substr(5).toUpperCase();
    return { firstFive, reminder };
  }
  go.onclick = function(element) {
    let { firstFive, reminder } = hashPass(
      document.getElementById("pass").value
    );
    console.log(firstFive, reminder);
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
        if (found)
          document.getElementById("parag").innerHTML = `Found ! : ${occ} times`;
        else document.getElementById("parag").innerHTML = "Password Safe :) ";
      })
      .catch(err => console.log(err));
  };
};
