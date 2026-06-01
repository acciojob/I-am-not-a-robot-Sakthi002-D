const imageContainer = document.getElementById("image-container");
const buttonContainer = document.getElementById("button-container");
const para = document.getElementById("para");

// IMAGE CLASSES
let images = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5"
];

// RANDOM DUPLICATE
let randomIndex = Math.floor(Math.random() * images.length);

images.push(images[randomIndex]);

// SHUFFLE IMAGES
images.sort(() => Math.random() - 0.5);

let selectedImages = [];
let selectedElements = [];

// CREATE IMAGES
images.forEach((className) => {

  const img = document.createElement("img");

  img.classList.add(className);

  img.addEventListener("click", () => {

    // ALLOW ONLY 2 SELECTIONS
    if (selectedImages.length >= 2) {
      return;
    }

    // PREVENT SAME IMAGE DOUBLE CLICK
    if (selectedElements.includes(img)) {
      return;
    }

    img.classList.add("selected");

    selectedImages.push(className);

    selectedElements.push(img);

    showResetButton();

    // SHOW VERIFY BUTTON AFTER 2 CLICKS
    if (selectedImages.length === 2) {
      showVerifyButton();
    }

  });

  imageContainer.appendChild(img);

});


// RESET BUTTON FUNCTION
function showResetButton() {

  // PREVENT MULTIPLE RESET BUTTONS
  if (document.getElementById("reset")) {
    return;
  }

  const resetBtn = document.createElement("button");

  resetBtn.id = "reset";

  resetBtn.innerText = "Reset";

  resetBtn.addEventListener("click", resetGame);

  buttonContainer.appendChild(resetBtn);

}


// VERIFY BUTTON FUNCTION
function showVerifyButton() {

  // PREVENT MULTIPLE VERIFY BUTTONS
  if (document.getElementById("verify")) {
    return;
  }

  const verifyBtn = document.createElement("button");

  verifyBtn.id = "verify";

  verifyBtn.innerText = "Verify";

  verifyBtn.addEventListener("click", verifyImages);

  buttonContainer.appendChild(verifyBtn);

}


// VERIFY IMAGES
function verifyImages() {

  const verifyBtn = document.getElementById("verify");

  verifyBtn.remove();

  if (selectedImages[0] === selectedImages[1]) {

    para.innerText =
      "You are a human. Congratulations!";

  } else {

    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

}


// RESET GAME
function resetGame() {

  selectedImages = [];

  selectedElements = [];

  para.innerText = "";

  document.querySelectorAll("img").forEach((img) => {

    img.classList.remove("selected");

  });

  const resetBtn = document.getElementById("reset");

  const verifyBtn = document.getElementById("verify");

  if (resetBtn) {
    resetBtn.remove();
  }

  if (verifyBtn) {
    verifyBtn.remove();
  }

}