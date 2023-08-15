const getToken = async () => {
  const accessToken = await chrome.storage.sync.get("accessToken");
  return accessToken;
};

let usernameElement = document.querySelector(".p-nickname");
let currentUsername = "";

const updateUsernameElement = () => {
  usernameElement = document.querySelector(".p-nickname");
};

const initialize = (response, usernameElement) => {
  if (response === true) {
    usernameElement.insertAdjacentHTML(
      "afterend",
      `<small style="color: #586069; font-size: 12px;">seni takip ediyor ✅</small>`
    );
  } else {
    usernameElement.insertAdjacentHTML(
      "afterend",
      `<small style="color: #586069; font-size: 12px;">seni takip etmiyor ❌</small>`
    );
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("received message", request);
  const message = request.message.split(":");
  if (currentUsername !== message[2]) {
    currentUsername = message[2];
    updateUsernameElement();
  } 
  if (request.message === `response:true:${currentUsername}`) {
    console.log(usernameElement);
    initialize(true, usernameElement);
  } else if (request.message === `response:false:${currentUsername}`) {
    initialize(false, usernameElement);
  }
});
