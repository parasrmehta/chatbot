const Chatbot = (function () {
  // Default configuration
  const config = {
    buttonColor: "#007bff",
    title: "Chatbot",
    welcomeMessage: "Hi! How can I assist you today?",
    apiHost: null, // Set to your API endpoint (e.g., 'https://your-api.com/chat')
  };

  // Create chatbot elements
  const container = document.createElement("div");
  container.className = "chatbot-container";

  const button = document.createElement("button");
  button.className = "chatbot-button";
  button.innerHTML = "??"; // Chat icon
  button.title = "Open Chat";

  const window = document.createElement("div");
  window.className = "chatbot-window";

  const header = document.createElement("div");
  header.className = "chatbot-header";
  header.innerHTML = config.title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "?";
  header.appendChild(closeBtn);

  const messages = document.createElement("div");
  messages.className = "chatbot-messages";

  const inputArea = document.createElement("div");
  inputArea.className = "chatbot-input";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your message...";

  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";

  // Assemble the chatbot
  inputArea.appendChild(input);
  inputArea.appendChild(sendButton);
  window.appendChild(header);
  window.appendChild(messages);
  window.appendChild(inputArea);
  container.appendChild(button);
  container.appendChild(window);
  document.body.appendChild(container);

  // Display welcome message
  addMessage(config.welcomeMessage, "bot-message");

  // Event listeners
  button.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);
  sendButton.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Toggle chat window
  function toggleChat() {
    window.classList.toggle("open");
  }

  // Send message and get response
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-message");
    input.value = "";

    // Simulate bot response (replace with API call if apiHost is set)
    if (config.apiHost) {
      fetch(config.apiHost, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
        .then((response) => response.json())
        .then((data) => addMessage(data.reply || "Sorry, no response.", "bot-message"))
        .catch(() => addMessage("Error contacting server.", "bot-message"));
    } else {
      setTimeout(() => {
        addMessage("This is a simulated response!", "bot-message");
      }, 1000);
    }
  }

  // Add message to chat
  function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = `message ${className}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
  }

  // Public API for customization
  return {
    init: (options) => {
      Object.assign(config, options);
      header.innerHTML = config.title;
      header.appendChild(closeBtn); // Re-append close button
      button.style.backgroundColor = config.buttonColor;
      messages.innerHTML = ""; // Clear messages
      addMessage(config.welcomeMessage, "bot-message");
    },
    destroy: () => {
      container.remove();
    },
  };
})();

export default Chatbot;
