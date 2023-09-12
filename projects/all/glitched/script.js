window.onload = function() {

    setTimeout(function() {
        alert("Hello user, thank you for your IP adress.");
      }, 2500);
      
    const glitchContainer = document.getElementById("glitchContainer");
    const imageCount = 30;
    const folderName = "imgs";
  
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    for (let i = 1; i <= imageCount; i++) {
      const img = document.createElement("img");
      img.src = `${folderName}/${i}.gif`;
  
      const x = getRandomNumber(0, window.innerWidth);
      const y = getRandomNumber(0, window.innerHeight);
  
      img.style.position = "absolute";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
  
      glitchContainer.appendChild(img);
    }
  };
  