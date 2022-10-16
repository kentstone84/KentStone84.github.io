// Connect HTML to JS
// alert("You're connected!")

// function appleChanger
// takes an id of an apple on the HTML page from an on click
// and changes the HTML element that the ID represents to an emoji
// var zombie = Math.floor(Math.random() * 8 )
 var zombie = Math.floor(Math.random()*8)
 var diamond = Math.floor(Math.random()*8)
 if (diamond === zombie) {
  var diamond = Math.floor(Math.random()*8)
 }
 // console.log(zombie, diamond);
 const imgChanger = (id) => {
  if (diamond === id){
    document.getElementById(id).innerHTML = "💎";
    alert("Yippee Ki Yay! You Won!")
  } else if(zombie === id){
        alert("U R CuRsEd!.!.!")
    return document.getElementById(id).innerHTML = "🧟";
  }
    else {
    return document.getElementById(id).innerHTML = "⌛";
    }
}
