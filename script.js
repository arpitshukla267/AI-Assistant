// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

// Attach click event listener to the button
function test() {
  // Function to convert text to speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  // Enhanced command handler
  function handleCommand(command) {
    const lowerCmd = command.toLowerCase();

    // Regex to extract all words after "open" (handles multiple)
    const openRegex = /open\s+([a-zA-Z0-9.\s]+(?:\sand\s[a-zA-Z0-9.\s]+)*)/;
    const match = lowerCmd.match(openRegex);

    if (match) {
      const rawSites = match[1]
        .replace(/,/g, "")
        .replace(/\sand\s/g, " ")
        .split(/\s+/);

      rawSites.forEach((siteRaw) => {
        const site = siteRaw.trim().toLowerCase();
        if (!site) return;

        let url = "";

        switch (site) {
          case "youtube":
            url = "https://www.youtube.com";
            break;
          case "google":
            url = "https://www.google.com";
            break;
          case "facebook":
            url = "https://www.facebook.com";
            break;
          case "instagram":
            url = "https://www.instagram.com";
            break;
          case "whatsapp":
            url = "https://www.whatsapp.com";
            break;
          case "netflix":
            url = "https://www.netflix.com";
            break;
          default:
            // If contains a dot, treat as full domain
            url = site.includes(".") ? `https://${site}` : `https://www.${site}.com`;
        }

        speak(`Opening ${site}...`);
        window.open(url, "_blank");
      });

    } else {
      speak("Searching Google for " + command);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
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
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized Command:", command);
    handleCommand(command);
  };

  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };
}

// Hotword trigger on load
window.onload = () => {
  try {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);

      if (transcript.toLowerCase().includes("hey siri")) {
        test();
      }
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
    };

  } catch (error) {
    console.error("Error:", error);
  }
};

// Manual button trigger
btn.addEventListener("click", () => {
  test();
});
