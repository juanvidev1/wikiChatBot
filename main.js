// import Client from "./client";

// const client = new Client();
const sendBtn = document.querySelector("#send-btn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  var input = document.getElementById("chat-input");
  var message = input.value;
  if (message.trim() === "") return;

  // Add user message
  var chatMessages = document.getElementById("chat-messages");
  var userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);

  const wordsArray = ["hola", "hello", "ola", "hi"];

  let botRes;
  if (wordsArray.includes(message.toLowerCase())) {
    botRes =
      "Welcome! I'm not bilingual, so please speak only in english. Por favor sólo inglés. \nYou can ask about a character or something and you will get a short answer from wikipedia about that particular answer \nThis bot is a little project to test wit.ai and won't save your answers or bot responses for the moment \nHave fun!";
  } else {
    // console.log("Message in if", message);
    try {
      botRes = await botResponse(message);
    } catch (error) {
      console.error("Error in sendMessage", error);
      botRes =
        "Sorry, I'm having trouble understanding your message. Please try again later.";
    }
  }

  // Clear the input
  input.value = "";

  // Add bot response
  setTimeout(function () {
    var botMessage = document.createElement("div");
    botMessage.className = "message bot";
    // Divide el mensaje del bot en líneas y crea nodos de texto para cada línea
    const lines = botRes.split("\n");
    lines.forEach((line) => {
      botMessage.appendChild(document.createTextNode(line));
      botMessage.appendChild(document.createElement("br"));
    });

    chatMessages.appendChild(botMessage);

    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
}

async function botResponse(message) {
  const raw = JSON.stringify({ message });
  //   console.log("Message in func", raw);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };

  const response = await fetch(
    "https://witbottest.onrender.com/api/v1/chatbot",
    options
  );
  //   console.log("Res", response.json());
  try {
    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    // console.log("Data", data);

    return data.extract;
  } catch (error) {
    console.error("Error in botResponse", error);
  }
}
