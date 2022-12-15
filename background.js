/**
 * Remove no translate and allow Chrome to translate web page
 * @returns {boolean}
 */
function removeNoTranslate() {
  // Remove no translate class from html
  document.documentElement.classList.remove("notranslate");

  // Remove no translate class from html
  document.body.classList.remove("notranslate");

  // Allow translating
  document.documentElement.translate = true;

  return true;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "Run",
  });

  chrome.action.onClicked.addListener(async (tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: removeNoTranslate
    },
    async (injectionResults) => {
      if (injectionResults[0].result) {
        await chrome.action.setBadgeText({
          tabId: tab.id,
          text: "Done"
        });
      }
    });
  });
});