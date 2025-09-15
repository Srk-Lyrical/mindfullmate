document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodMessage = document.getElementById('mood-message');
    const journalInput = document.getElementById('journal-input');
    const saveJournalBtn = document.getElementById('save-journal');
    const journalMessage = document.getElementById('journal-message');

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Append message to chat
    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ' + className;
        msgDiv.textContent = text;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Simple AI responses for mental health support
    function getBotResponse(userText) {
        const text = userText.toLowerCase();
        if (text.includes('sad') || text.includes('depressed')) {
            return "I'm sorry you're feeling sad. Remember, it's okay to feel this way sometimes. Have you tried talking to a friend or doing something you enjoy? If it persists, consider reaching out to a counselor.";
        } else if (text.includes('anxious') || text.includes('anxiety')) {
            return "Anxiety can be tough. Try deep breathing exercises: inhale for 4 counts, hold for 4, exhale for 4. You're not alone in this.";
        } else if (text.includes('stressed') || text.includes('stress')) {
            return "Stress is common for students. Break tasks into smaller steps and take breaks. Prioritize self-care.";
        } else if (text.includes('happy') || text.includes('good')) {
            return "That's great to hear! Keep nurturing positive feelings. What made you feel good today?";
        } else if (text.includes('help') || text.includes('support')) {
            return "I'm here to support you. You can share your feelings, ask for advice, or just chat. Remember, professional help is always available.";
        } else {
            return "Thank you for sharing. How can I support you today? If you're struggling, consider resources like your university's counseling center.";
        }
    }

    // Send message
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage(text, 'user-message');
        userInput.value = '';
        // Bot response
        setTimeout(() => {
            const response = getBotResponse(text);
            appendMessage(response, 'bot-message');
        }, 1000);
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

    // Welcome message
    appendMessage("Hello! I'm Mindfulmate, your AI mental health support chatbot. How are you feeling today?", 'bot-message');
});
