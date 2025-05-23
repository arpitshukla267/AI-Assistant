// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); //it creates a new instance of the SpeechRecognition object, which is used for speech recognition in web applications.
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

// Attach click event listener to the button
  function test () {
  // Function to convert text to speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text); // SpeechSynthesisUtterance(text) -> coverts text to speech
    utterance.lang = "en-US"; // Set the language for the speech synthesis
    window.speechSynthesis.speak(utterance); // window.speechSynthesis.speak(utterance) -> speaks the text using the speech synthesis API
  }

  // Function to handle recognized commands
  function handleCommand(command) {
    if (command.includes("open youtube")) {
      speak("Opening YouTube...");
      window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("open google")) {
      speak("Opening Google...");
      window.open("https://www.google.com", "_blank");
    } else if (command.includes("open facebook")) {
      speak("Opening Facebook...");
      window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open instagram")) {
      speak("Opening Instagram...");
      window.open("https://www.instagram.com", "_blank");
    } else if (command.includes("open whatsapp")) {
      speak("Opening WhatsApp...");
      window.open("https://www.whatsapp.com", "_blank");
    } else {
      // Perform a Google search if command not recognized
      speak("Searching Google for " + command);
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(command)}`,
        "_blank"
      );
    }
  }

  // Greet the user and then start listening
  speak("Hello, how can I help you?");

  // Delay to ensure greeting completes before starting recognition
  setTimeout(() => {
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    recognition.start();
  }, 2000);

  // When a result is received
  recognition.onresult = (event) => {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // When recognition ends
  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };

};

window.onload = () => {
  try {
    // Assuming 'transcript' is coming from a speech recognition setup
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = true; // Set to true for continuous recognition
    recognition.start();


    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);

      if (transcript.toLowerCase().includes("hey siri")) {
        test(); // Your custom function
      }
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
    };

  } catch (error) {
    console.error("Error:", error);
  }
};

btn.addEventListener("click", () => {
  test();
});