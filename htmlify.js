let observer;
observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Convert any description on the **build page** from text to html
    const buildPageDescription = document.querySelector(".RunDetails-Description .message");
    convertTextToHtml(buildPageDescription);

    // Convert any description on the **project page** from text to html
    const messageColumn = document.querySelectorAll(".JTable-cell-contents .RunMessageCell");
    
    messageColumn.forEach(messageCell => {
      // The title is set to raw HTML as well so clean that up
      if (messageCell.title) {
        messageCell.title = "";
      }
      const messageCellInnerDescription = messageCell.querySelector(".RunMessageCellInner .unstyled-link");
      convertTextToHtml(messageCellInnerDescription);
    });
  });
});

/**
 * Turns the raw HTML text rendered by an element to actual HTML if the raw text contains HTML elements
 * @param {Element} element HTML element  
 */
function convertTextToHtml(element) {
  // Presence of "<" might indicate that it might be raw HTML
  if (element?.innerText?.includes("<")) {
    // Test if the text is indeed HTML by using an HTML element like div
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = element.innerText;
    // If the innerText is rendered differently, highly likely that it contains valid HTML elements
    if (tempDiv.innerText != element.innerText) {
      element.innerHTML = element.innerText;
    }
  }
}

// Define the configuration
const config = {
  subtree: true,
  attributes: false,
  childList: true,
  characterData: true,
};

// Observe the target
observer.observe(document.body, config);
