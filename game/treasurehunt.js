// Connect HTML to JS
// alert("You're connected!")

// function appleChanger
// takes an id of an apple on the HTML page from an on click
// and changes the HTML element that the ID represents to an emoji
// var tornado = Math.floor(Math.random() * 8 )
 var tornado = Math.floor(Math.random()*8)
 var sunnyday = Math.floor(Math.random()*8)
 if (sunnyday === tornado) {
  var sunnyday = Math.floor(Math.random()*8)
 }
 // console.log(tornado, sunnyday);
 const imgChanger = (id) => {
  if (sunnyday === id){
    document.getElementById(id).innerHTML = "🌤️";
    alert("A sunny day, everyone wins!")
  } else if(tornado === id){
        alert("Tornado has hit, you lose!")
    return document.getElementById(id).innerHTML = "🌪️";
  }
    else {
    return document.getElementById(id).innerHTML = "🌬️";
    }
}


