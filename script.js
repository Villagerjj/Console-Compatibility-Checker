const form = document.querySelector("form");
const result = document.querySelector("#result");

// Create an array of all the console names
const consoles = ["Nintendo 64 (US)","Nintendo 64 (Japan)","Nintendo 64 (Europe)", "Super Nintendo (US)", "Super Nintendo (Europe)", "Super Nintendo (Japan)", "PlayStation 1", "Sega Genesis"];

// Add an event listener to the form to listen for submit events
form.addEventListener("submit", async e => {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the value of the game search input
  const gameSearch = form.querySelector("#game-search").value;

  // An array to store the compatible consoles
  const compatibleConsoles = [];

  // Loop through the consoles
  for (const console of consoles) {
    // Fetch the games list for the current console
    const response = await fetch(`games/${console}.txt`);
    const data = await response.text();

    // Use regular expression to match the game name in the file
    const re = new RegExp(gameSearch, "i");
    if (re.test(data)) {
      compatibleConsoles.push(console);
    }
  }

  // Clear the result element
  result.innerHTML = "";

  // If no compatible consoles are found, display a message
  if (compatibleConsoles.length === 0) {
    result.innerHTML = `<p> Sorry, ` + gameSearch + ` has not been officially released on any console prior to 2012 </p>`;
  } else {
    // Otherwise, display a list of compatible consoles
    result.innerHTML = ` <p> `+ gameSearch + ` has been officially released on: </p>`;
    const list = document.createElement("ul");
    compatibleConsoles.forEach(console => {
      const item = document.createElement("li");
      item.textContent = console;
      list.appendChild(item);
    });
    result.appendChild(list);
  }
  });
