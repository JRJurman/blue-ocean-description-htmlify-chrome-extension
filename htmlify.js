// setup mutation observer, because this is the new cool way to see if elements are mounted
let observer;
observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const messageElement = document.querySelector(".message");

    // we need to know if there's a tag character, in the text... if there isn't, don't go crazy
    const messageElementContainsTag = messageElement?.innerText?.includes("<");
    if (messageElement && messageElementContainsTag) {
      // this is the real magic - set the html of the message box to whatever the text of the message box is
      messageElement.innerHTML = messageElement.innerText;
    }
  });
});

// Define the configuration
const config = {
  subtree: true,
  attributes: false,
  childList: true,
  characterData: true,
};

// Observe the target
observer.observe(document.body, config);
