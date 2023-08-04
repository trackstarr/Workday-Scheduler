
//Displaying the time to the header of the page
function displayTime() {
  const timeDisplayEl = document.getElementById("current-time");
  const currentTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  timeDisplayEl.textContent = currentTime;
}

setInterval(displayTime, 1000);

//Assign classes to elements with the class "time-block" based on the current hour updating the color assignment based on "past,present,future"
const currentHour = dayjs().hour();

const timeBlocks = document.querySelectorAll(".time-block");
timeBlocks.forEach((timeBlock) => {
  const hour = parseInt(timeBlock.id.split("-")[1]);

  if (hour < currentHour) {
    timeBlock.classList.add("past");
    timeBlock.classList.remove("present", "future");
  } else if (hour === currentHour) {
    timeBlock.classList.add("present");
    timeBlock.classList.remove("past", "future");
  } else {
    timeBlock.classList.add("future");
    timeBlock.classList.remove("past", "present");
  }
});
//Saving to local storage
function saveDescription(hour) {
  const descriptionEl = document.querySelector(`#hour-${hour} .description`);
  const description = descriptionEl.value.trim();
  localStorage.setItem(`hour-${hour}`, description);
}
//Loading from local storage to display on the corresponding time block
function loadDescription(hour) {
  const descriptionEl = document.querySelector(`#hour-${hour} .description`);
  const description = localStorage.getItem(`hour-${hour}`);
  descriptionEl.value = description;
}
//Event listener element that saves the hour value from the "id" and calls tthe saveDescription Function to save the value for that hour
function addSaveButtonListeners() {
  const saveButtons = document.querySelectorAll(".saveBtn");
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener("click", () => {
      const hour = parseInt(saveButton.parentNode.id.split("-")[1]);
      saveDescription(hour);
    });
  });
}

for (let hour = 9; hour <= 17; hour++) {
  loadDescription(hour);
}
//Adds the event listener above to all save buttons
addSaveButtonListeners();