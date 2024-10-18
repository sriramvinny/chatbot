const userMessage = 
{
  greetings: [["hi", "hey", "hello"]],
  destinations: [["where to go", "best destinations", "travel suggestions"]],
  weather: [["what about the weather", "how's the weather", "weather info"]],
  travelTips: [["tell me a travel story", "share a travel experience", "give me a travel tip"]],
  booking: [["how do I book a flight", "flight booking", "how to book a trip"]],
  hotels: [["suggest a hotel", "best hotels", "where to stay"]],
  packing: [["what to pack", "packing list", "what should I bring"]],
  culture: [["tell me about the culture", "cultural differences", "local customs"]],
  cuisine: [["what should I eat", "local cuisine", "best dishes"]],
  safety: [["is it safe to travel", "safety tips", "travel safety"]],
  thanks: [["thanks", "thank you"]]
};
const botReply ={
    greetings: [["Hello! How can I assist you with your travel plans today?", "Hi there! Ready to plan your next adventure?"]],
    destinations: [["I recommend places like Bali, Paris, or New York. What do you prefer?", "You might love destinations like Tokyo or Barcelona!"]],
    weather: [["It depends on the location. Do you have a specific place in mind?", "Let me know where you’re going, and I can help with that!"]],
    travelTips: [["Always travel light! A good story is when you visit places you’ve never been.", "Traveling is about the experience! Let me share a tip..."]],
    booking: [["You can book flights through sites like Expedia or directly from airlines.", "Check Skyscanner or Google Flights for the best deals."]],
    hotels: [["It depends on your budget, but I can suggest some great options!", "Check out reviews on sites like TripAdvisor for the best stays."]],
    packing: [["Always pack essentials like clothes, toiletries, and your travel documents.", "Consider the climate and activities when packing!"]],
    culture: [["In different cultures, greetings can vary greatly. It’s always good to research beforehand.", "Knowing local customs can enrich your travel experience!"]],
    cuisine: [["Try local specialties! In Italy, for example, you can't miss authentic pasta.", "Food is a big part of travel; always explore the local markets!"]],
    safety: [["Always stay aware of your surroundings. Research travel advisories for your destination.", "It’s important to keep copies of important documents, just in case."]],
    thanks: [["You're welcome! Happy to help with your travel plans!"]]
};
  const alternative =  [
    "What else would you like to know about travel?",
    "I’m here to help with anything travel-related!",
    "Feel free to ask me anything about your next trip!",
    "What’s on your mind regarding your travels?"
];
  let context = ""; 
  const synth = window.speechSynthesis;
  
  function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
  }
  
  function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    if (input) output(input);
    inputField.value = "";
  }
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            sendMessage();
        }
    });
});

function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "").trim();
    let product = compare(text);
    product = product ? product : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
}

function compare(string) {
    for (const [key, messages] of Object.entries(userMessage)) {
        for (const message of messages) {
            if (message.includes(string)) {
                context = key; // Update context
                return botReply[key][Math.floor(Math.random() * botReply[key].length)];
            }
        }
    }
    return null;
}

function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span>${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span>${product}</span>`;
    mainDiv.appendChild(botDiv);

    mainDiv.scrollTop = mainDiv.scrollHeight;
    voiceControl(product);
}