import { GEMINI_API_KEY, OPENROUTER_API_KEY } from './config.js';

    document.addEventListener('DOMContentLoaded', () => {
        const chatContainer = document.getElementById('chat-container');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const micBtn = document.getElementById('mic-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const moodButtons = document.querySelectorAll('.mood-btn');
        const moodMessage = document.getElementById('mood-message');
        const journalInput = document.getElementById('journal-input');
        const saveJournalBtn = document.getElementById('save-journal');
        const journalMessage = document.getElementById('journal-message');
        const languageSelect = document.getElementById('language-select');
        const goToBiodataBtn = document.getElementById('go-to-biodata');

        // Auto-focus on chat input
        userInput.focus();

    // Language translations
    const translations = {
        en: {
            placeholder: "Share how you're feeling or ask for advice...",
            welcome: "Hello! I'm Mindfulmate, your AI mental health support chatbot. How are you feeling today?",
            typing: "Typing...",
            error: "I'm having trouble connecting right now. Please try again later. Remember, if you're in crisis, reach out to a professional or hotline.",
            moodLogged: "Mood logged:",
            journalSaved: "Journal entry saved!",
            journalPlaceholder: "Write about your day...",
            saveEntry: "Save Entry"
        },
        hi: {
            placeholder: "अपनी भावनाओं को साझा करें या सलाह मांगें...",
            welcome: "नमस्ते! मैं माइंडफुलमेट हूं, आपका AI मानसिक स्वास्थ्य सहायता चैटबॉट। आप आज कैसा महसूस कर रहे हैं?",
            typing: "टाइप कर रहा हूं...",
            error: "मैं अभी कनेक्ट करने में परेशानी हो रही है। कृपया बाद में फिर से प्रयास करें। यदि आप संकट में हैं, तो किसी पेशेवर या हॉटलाइन से संपर्क करें।",
            moodLogged: "मूड लॉग किया गया:",
            journalSaved: "जर्नल एंट्री सहेजी गई!",
            journalPlaceholder: "अपने दिन के बारे में लिखें...",
            saveEntry: "एंट्री सहेजें"
        },
        ta: {
            placeholder: "உங்கள் உணர்வுகளைப் பகிர்ந்து கொள்ளுங்கள் அல்லது ஆலோசனை கேளுங்கள்...",
            welcome: "வணக்கம்! நான் மைண்ட்ஃபுல்மேட், உங்கள் AI மனநல ஆதரவு சாட்போட். இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?",
            typing: "தட்டச்சு செய்கிறேன்...",
            error: "இப்போது இணைப்பதில் சிக்கல் உள்ளது. தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும். நீங்கள் நெருக்கடியில் இருந்தால், ஒரு தொழில்முறை அல்லது ஹாட்லைனைத் தொடர்பு கொள்ளுங்கள்.",
            moodLogged: "மனநிலை பதிவு செய்யப்பட்டது:",
            journalSaved: "ஜர்னல் உள்ளீடு சேமிக்கப்பட்டது!",
            journalPlaceholder: "உங்கள் நாளைப் பற்றி எழுதுங்கள்...",
            saveEntry: "உள்ளீடு சேமி"
        },
        te: {
            placeholder: "మీ భావాలను పంచుకోండి లేదా సలహా అడగండి...",
            welcome: "హలో! నేను మైండ్‌ఫుల్‌మేట్, మీ AI మానసిక ఆరోగ్య మద్దతు చాట్‌బాట్. మీరు ఈరోజు ఎలా అనుభవిస్తున్నారు?",
            typing: "టైప్ చేస్తున్నాను...",
            error: "ప్రస్తుతం కనెక్ట్ చేయడంలో సమస్య ఉంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి. మీరు సంక్షోభంలో ఉంటే, వృత్తిపరమైన సహాయం లేదా హాట్‌లైన్‌ను సంప్రదించండి.",
            moodLogged: "మూడ్ లాగ్ చేయబడింది:",
            journalSaved: "జర్నల్ ఎంట్రీ సేవ్ చేయబడింది!",
            journalPlaceholder: "మీ రోజు గురించి వ్రాయండి...",
            saveEntry: "ఎంట్రీ సేవ్ చేయండి"
        },
        ml: {
            placeholder: "നിങ്ങളുടെ വികാരങ്ങൾ പങ്കുവയ്ക്കുക അല്ലെങ്കിൽ ഉപദേശം ചോദിക്കുക...",
            welcome: "ഹലോ! ഞാൻ മൈൻഡ്ഫുൾമേറ്റ്, നിങ്ങളുടെ AI മാനസികാരോഗ്യ പിന്തുണ ചാറ്റ്ബോട്ട്. ഇന്ന് നിങ്ങൾ എങ്ങനെ തോന്നുന്നു?",
            typing: "ടൈപ്പ് ചെയ്യുന്നു...",
            error: "ഇപ്പോൾ കണക്റ്റ് ചെയ്യുന്നതിൽ പ്രശ്നമുണ്ട്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക. നിങ്ങൾ പ്രതിസന്ധിയിലാണെങ്കിൽ, ഒരു പ്രൊഫഷണലിനോടോ ഹോട്ട്‌ലൈനിനോടോ ബന്ധപ്പെടുക.",
            moodLogged: "മൂഡ് ലോഗ് ചെയ്തു:",
            journalSaved: "ജേണൽ എൻട്രി സേവ് ചെയ്തു!",
            journalPlaceholder: "നിങ്ങളുടെ ദിവസത്തെ കുറിച്ച് എഴുതുക...",
            saveEntry: "എൻട്രി സേവ് ചെയ്യുക"
        },
        kn: {
            placeholder: "ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಸಲಹೆ ಕೇಳಿ...",
            welcome: "ಹಲೋ! ನಾನು ಮೈಂಡ್‌ಫುಲ್‌ಮೇಟ್, ನಿಮ್ಮ AI ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲ ಚಾಟ್‌ಬಾಟ್. ಇಂದು ನೀವು ಹೇಗೆ ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ?",
            typing: "ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದೇನೆ...",
            error: "ಈಗ ಕನೆಕ್ಟ್ ಮಾಡುವಲ್ಲಿ ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ನೀವು ಬಿಕ್ಕಟ್ಟಿನಲ್ಲಿದ್ದರೆ, ವೃತ್ತಿಪರ ಸಹಾಯ ಅಥವಾ ಹಾಟ್‌ಲೈನ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.",
            moodLogged: "ಮೂಡ್ ಲಾಗ್ ಮಾಡಲಾಗಿದೆ:",
            journalSaved: "ಜರ್ನಲ್ ಎಂಟ್ರಿ ಉಳಿಸಲಾಗಿದೆ!",
            journalPlaceholder: "ನಿಮ್ಮ ದಿನದ ಬಗ್ಗೆ ಬರೆಯಿರಿ...",
            saveEntry: "ಎಂಟ್ರಿ ಉಳಿಸಿ"
        },
        ur: {
            placeholder: "اپنی احساسات شیئر کریں یا مشورہ طلب کریں...",
            welcome: "ہیلو! میں مائنڈفولمیٹ ہوں، آپ کا AI ذہنی صحت سپورٹ چیٹ بوٹ۔ آج آپ کیسا محسوس کر رہے ہیں؟",
            typing: "ٹائپ کر رہا ہوں...",
            error: "ابھی کنیکٹ کرنے میں پریشانی ہو رہی ہے۔ براہ کرم بعد میں دوبارہ کوشش کریں۔ اگر آپ بحران میں ہیں تو، کسی پیشہ ور یا ہاٹ لائن سے رابطہ کریں۔",
            moodLogged: "موڈ لاگ کیا گیا:",
            journalSaved: "جرنل انٹری محفوظ کی گئی!",
            journalPlaceholder: "اپنے دن کے بارے میں لکھیں...",
            saveEntry: "انٹری محفوظ کریں"
        }
    };

    // Function to update UI based on selected language
    function updateLanguage(lang) {
        const trans = translations[lang];
        userInput.placeholder = trans.placeholder;
        journalInput.placeholder = trans.journalPlaceholder;
        saveJournalBtn.textContent = trans.saveEntry;
        // Update welcome message if needed
        // Note: Welcome message is already displayed, so we might need to refresh or handle dynamically
    }

    // Load saved language
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = savedLang;
    updateLanguage(savedLang);

    // Speech language mapping
    const speechLangMap = {
        en: 'en-US',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        ml: 'ml-IN',
        kn: 'kn-IN',
        ur: 'ur-IN'
    };

    // Voice recognition and synthesis setup
    let recognition;
    let isListening = false;
    let synth = window.speechSynthesis;

    // Speech synthesis setup
    function speakText(text, lang) {
        if (!synth) {
            console.warn('Speech synthesis not supported');
            return;
        }
        synth.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = speechLangMap[lang] || 'en-US';
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;
        synth.speak(utterance);
    }

    // Voice recognition setup
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = speechLangMap[savedLang] || 'en-US';

        recognition.onstart = () => {
            isListening = true;
            micBtn.textContent = '⏹️';
            micBtn.classList.add('listening');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendBtn.click(); // Auto-send
        };

        recognition.onend = () => {
            isListening = false;
            micBtn.textContent = '🎤';
            micBtn.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            micBtn.textContent = '🎤';
            micBtn.classList.remove('listening');
            if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow access to use voice input.');
            } else {
                alert('Speech recognition error. Please try again.');
            }
        };
    } else {
        micBtn.disabled = true;
        micBtn.title = 'Voice input not supported in this browser';
    }

    // Microphone button event listener
    micBtn.addEventListener('click', () => {
        if (!recognition) {
            alert('Voice input is not supported in this browser. Please use text input.');
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            const currentLang = languageSelect.value;
            recognition.lang = speechLangMap[currentLang] || 'en-US';
            recognition.start();
        }
    });

    // Language selector event listener (merged)
    languageSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        updateLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang);
        if (recognition) {
            recognition.lang = speechLangMap[selectedLang] || 'en-US';
        }
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ' + className;
        msgDiv.textContent = text;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }



    sendBtn.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage(text, 'user-message');
        userInput.value = '';
        // Show typing indicator
        appendMessage('Typing...', 'bot-message');
        try {
            const response = await getOpenRouterResponse(text);
            // Remove typing indicator and add actual response
            chatContainer.removeChild(chatContainer.lastChild);
            appendMessage(response, 'bot-message');
            // Speak the response
            const currentLang = languageSelect.value;
            speakText(response, currentLang);
        } catch (error) {
            // Remove typing indicator and show error
            chatContainer.removeChild(chatContainer.lastChild);
            appendMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
        }
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Mood tracking
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            const date = new Date().toLocaleDateString();
            const moodData = JSON.parse(localStorage.getItem('moodTracker')) || {};
            moodData[date] = mood;
            localStorage.setItem('moodTracker', JSON.stringify(moodData));
            moodMessage.textContent = `Mood logged: ${mood.charAt(0).toUpperCase() + mood.slice(1)} on ${date}`;
        });
    });

    // Journal saving
    saveJournalBtn.addEventListener('click', () => {
        const entry = journalInput.value.trim();
        if (!entry) {
            journalMessage.textContent = 'Please write something before saving.';
            return;
        }
        const date = new Date().toLocaleString();
        const journalData = JSON.parse(localStorage.getItem('journalEntries')) || [];
        journalData.push({ date, entry });
        localStorage.setItem('journalEntries', JSON.stringify(journalData));
        journalInput.value = '';
        journalMessage.textContent = 'Journal entry saved!';
    });

    // Bio data button
    goToBiodataBtn.addEventListener('click', () => {
        window.location.href = 'biodata.html';
    });

    // Function to get personalized prompt based on bio data
    function getPersonalizedPrompt(userText) {
        const bioData = JSON.parse(localStorage.getItem('bioData')) || {};
        let prompt = `You are Mindfulmate, an AI mental health support chatbot for higher education students. Provide empathetic, supportive responses focused on mental health, stress management, and well-being. Encourage seeking professional help when appropriate.`;

        if (bioData.name) {
            prompt += ` The user's name is ${bioData.name}.`;
        }
        if (bioData.age) {
            prompt += ` The user is ${bioData.age} years old.`;
        }
        if (bioData.gender) {
            prompt += ` The user's gender is ${bioData.gender}.`;
        }
        if (bioData.university) {
            prompt += ` The user studies at ${bioData.university}.`;
        }
        if (bioData.yearOfStudy) {
            prompt += ` The user is in their ${bioData.yearOfStudy}.`;
        }
        if (bioData.concerns && bioData.concerns.length > 0) {
            prompt += ` The user has mentioned concerns about: ${bioData.concerns.join(', ')}.`;
        }
        if (bioData.preferences && bioData.preferences.length > 0) {
            prompt += ` The user prefers: ${bioData.preferences.join(', ')}.`;
        }

        prompt += ` User message: ${userText}`;
        return prompt;
    }

    // Function to get response from Gemini
    async function getBotResponse(userText) {
        const prompt = getPersonalizedPrompt(userText);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
        } catch (error) {
            console.error('Error fetching response from Gemini:', error);
            const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
            return translations[selectedLang].error;
        }
    }

    // Function to get response from OpenRouter
    async function getOpenRouterResponse(userText) {
        const systemPrompt = getPersonalizedPrompt(''); // Get the base prompt without user text
        console.log("OpenRouter API call - systemPrompt:", systemPrompt);
        console.log("OpenRouter API call - userText:", userText);
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    // Optional: Include these for app attribution on OpenRouter leaderboards
                    'HTTP-Referer': 'http://localhost:5500', // Your site URL/localhost
                    'X-Title': 'Mindfulmate Chatbot' // Your app title
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat-v3.1:free",
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userText }
                    ]
                })
            });
            console.log("OpenRouter API request headers:", response.headers);
            console.log("OpenRouter API request body:", JSON.stringify({
                model: "deepseek/deepseek-chat-v3.1:free",
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userText }
                ]
            }));
            console.log("OpenRouter API response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`API Error: ${response.status} - ${errorData.error.message}`);
                throw new Error(`API Error: ${response.status} - ${errorData.error.message}`);
            }

            const data = await response.json();

            // Assuming a non-streaming response structure similar to OpenAI
            const aiContent = data.choices[0].message.content;
            return aiContent;

        } catch (error) {
            console.error("Fetch error:", error);
            const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
            return translations[selectedLang].error + " (Check console for details)";
        }
    }

    // Welcome message
    const bioData = JSON.parse(localStorage.getItem('bioData')) || {};
    if (bioData.name) {
        appendMessage(`Welcome back, ${bioData.name}! I'm Mindfulmate, your AI mental health support chatbot. How are you feeling today?`, 'bot-message');
    } else {
        appendMessage("Hello! I'm Mindfulmate, your AI mental health support chatbot. How are you feeling today?", 'bot-message');
    }
});
