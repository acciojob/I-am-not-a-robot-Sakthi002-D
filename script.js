const imageContainer = document.getElementById("image-container");
const buttonContainer = document.getElementById("button-container");
const para = document.getElementById("para");

let images = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5"
];

// ADD RANDOM DUPLICATE
let randomIndex = Math.floor(Math.random() * images.length);

images.push(images[randomIndex]);

// SHUFFLE
images.sort(() => Math.random() - 0.5);

let selectedImages = [];
let selectedElements = [];

// CREATE IMAGES
images.forEach((className) => {

  const img = document.createElement("img");

  img.classList.add(className);

  img.addEventListener("click", () => {

    // ONLY 2 SELECTIONS
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

    if (selectedImages.length === 2) {
      showVerifyButton();
    }

  });

  imageContainer.appendChild(img);

});


// RESET BUTTON
function showResetButton() {

  if (document.getElementById("reset")) {
    return;
  }

  const resetBtn = document.createElement("button");

  resetBtn.id = "reset";

  resetBtn.innerText = "Reset";

  resetBtn.addEventListener("click", resetGame);

  buttonContainer.append(resetBtn);

}


// VERIFY BUTTON
function showVerifyButton() {

  if (document.getElementById("verify")) {
    return;
  }

  const verifyBtn = document.createElement("button");

  verifyBtn.id = "verify";

  verifyBtn.innerText = "Verify";

  verifyBtn.addEventListener("click", verifyImages);

  buttonContainer.append(verifyBtn);

}


// VERIFY FUNCTION
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


// RESET FUNCTION
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