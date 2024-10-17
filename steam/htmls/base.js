const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ-"

function gameArthack(a){

  //Function to make the characters in the banner(BINARY-STEAM) cycle randomly
  if(a == 0) b = "hack0" //Logo

  document.getElementById(b).onmouseover = event => {
    let iterations = 0;

    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText.split("")
      .map((letter, index) => {
        if (index < iterations) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 27)]
      })
      .join("");

      if(iterations >= event.target.dataset.length) {
       clearInterval(interval);
      }
      iterations+=1 / 3;
    }, 75);
  }
}