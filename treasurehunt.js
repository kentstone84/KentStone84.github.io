// Connect HTML to JS
// alert("You're connected!")

// function appleChanger
// takes an id of an apple on the HTML page from an on click
// and changes the HTML element that the ID represents to an emoji
// var zombie = Math.floor(Math.random() * 8 )
const imgChanger = (id) => {
  // Generate new random numbers for zombie and diamond if they are equal
  if (diamond === zombie) {
    zombie = Math.floor(Math.random() * 8);
    diamond = Math.floor(Math.random() * 8);
  }

  // Change HTML element based on id
  if (diamond === id) {
    document.getElementById(id).innerHTML = "💎";
    alert("Congratulations! You won!");
  } else if (zombie === id) {
    document.getElementById(id).innerHTML = "🧟‍♂️";
    alert("Oh no! You lost!");
  } else {
    document.getElementById(id).innerHTML = "⌛";
  }
};
