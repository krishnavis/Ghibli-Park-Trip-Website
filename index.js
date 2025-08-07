
/*** Dark Mode ***
  Purpose:
  - Add a dark mode feature to your website. ***/

// Select the theme button
let themebutton = document.getElementById("theme-button")

// The callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
    // This section will run whenever the button is clicked
}

// Register a 'click' event listener for the theme button,
//             and use toggleDarkMode as its callback function
themebutton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants. ***/

// Add your query for the submit RSVP button 
let rsvpButton = document.getElementById("rsvp-button")
let count = 3;

const addParticipant = (person) => {
    // Manipulate the DOM 
    const phonenumber = document.getElementById("number-input").value;
    const email = document.getElementById("email-input").value;

    const newParagraph = document.createElement("p");
    newParagraph.textContent = `❀ ${person.name} has RSVP'd.`;

    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParagraph);

    const oldCount = document.getElementById("rsvp-count");
    if(oldCount){
      oldCount.remove();
    }
    count = count + 1;
    const newcountParagraph = document.createElement("p");
    newcountParagraph.textContent = "✮ "+ count + " people have RSVP'd for this event!";
    participantsDiv.appendChild(newcountParagraph);
}

/*** Form Validation ***
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants. ***/

// The callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  let rsvpInputs = document.getElementById("rsvp-form").elements;
  let person = {
    name: rsvpInputs[0].value,
    number: rsvpInputs[1].value,
    email: rsvpInputs[2].value
  }
  // Loop through all inputs
  for(let i = 0; i < rsvpInputs.length; i++){

   if (rsvpInputs[i].tagName !== "INPUT") continue; 
    // Inside loop, validate the value of each input
    if(rsvpInputs[i].value.length < 2){
      containsErrors = true;
      rsvpInputs[i].classList.add("error");
    } else {
      rsvpInputs[i].classList.remove("error");
    }
  }

  //Checking the email to see if it is valid (contains "@")
  let emailInput = document.getElementById("email-input");
  if(!person.email.includes("@")){
      containsErrors = true;
      emailInput.classList.add("error");
    } else {
      emailInput.classList.remove("error");
    }

  // If no errors, call addParticipant() and clear fields
  if (containsErrors == false){
    addParticipant(person);
    toggleModal(person);
    for(let i = 0; i < rsvpInputs.length; i++){
      rsvpInputs[i].value = "";
    }
  }
}

rsvpButton.addEventListener("click", validateForm);

/*** Modal ***
  Purpose:
  - Add a pop-up modal to your website. ***/

const toggleModal = (person) => {
    let modalContent = document.getElementById("modal-text");
    let modal = document.getElementById("success-modal"); 
    // Update modal display to flex
    modal.style.display = "flex";

    // Update modal text to personalized message
    modalContent.innerHTML = `Trip: Joined! <br> Thank you for signing up, ${person.name}! We look forward to seeing you there!`;
    let intervalID = setInterval(animateImage, 500);
    // Set modal timeout to 5 seconds
    setTimeout(() => {
    // Update modal display to none
      modal.style.display = "none";
      clearInterval(intervalID);
    }, 5000);
}

/*** Animations ***/
// Animation variables and animateImage() function
let enableMotion = true;
let rotateFactor = 0;
let modalImage = document.querySelector("#success-modal img");
const animateImage = () => {
  if(enableMotion){
    if (rotateFactor == 0){
      rotateFactor = -10; 
    } else {
      rotateFactor = 0;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  }
}

// Exit modal button 
const exitModalButton = document.getElementById("exit-modal-button");
let modal = document.getElementById("success-modal"); 
const closeModal = () => {
  // Hides the modal again 
  modal.style.display = "none";
}
exitModalButton.addEventListener("click", closeModal);

// Reduce motion button
const reduceMotionButton = document.getElementById("reduce-motion-button");
const reduceMotion = () => {
  if(enableMotion){
    enableMotion = false; 
    reduceMotionButton.textContent = "Enable Motion";
  } else {
    enableMotion = true; 
    reduceMotionButton.textContent = "Reduce Motion";
  }
}
reduceMotionButton.addEventListener("click", reduceMotion);
