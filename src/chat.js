import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

(function(){ 
const tokenProvider = new TokenProvider({
  url: process.env.TOKEN_ENDPOINT
});

const chatManager = new ChatManager({
  instanceLocator: "v1:us1:ac1e60dc-3833-4ebf-bd2d-e31aa1aa68ee",
  userId: "alexis",
  tokenProvider: tokenProvider
});

chatManager
.connect()
.then(currentUser => {
  console.log('connected', currentUser);
  currentUser.subscribeToRoom({
    roomId: currentUser.rooms[0].id,
    hooks: {
      onMessage: message => {
        const ul = document.getElementById("message-list");
        const li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${message.senderId}: ${message.text}`)
        );
        ul.appendChild(li);
      }
    }
  });

const form = document.getElementById("message-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("message-text");
  currentUser.sendMessage({
    text: input.value,
    roomId: currentUser.rooms[0].id
  });
  input.value = "";
});
})
.catch(error => {
console.error("error:", error);
});

})();