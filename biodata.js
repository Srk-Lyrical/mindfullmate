document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('biodata-form');
    const messageDiv = document.getElementById('message');
    const backBtn = document.getElementById('back-to-chatbot');

    // Load existing bio data if available
    loadBioData();

    // Back to chatbot button
    backBtn.addEventListener('click', () => {
        window.location.href = 'chatbot.html';
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const bioData = {
            name: formData.get('name'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            university: formData.get('university'),
            yearOfStudy: formData.get('year-of-study'),
            concerns: formData.getAll('concerns'),
            preferences: formData.getAll('preferences'),
            emergencyContact: formData.get('emergency-contact'),
            emergencyPhone: formData.get('emergency-phone'),
            consent: formData.get('consent') === 'on'
        };

        // Validate consent
        if (!bioData.consent) {
            showMessage('You must consent to the data collection to proceed.', 'error');
            return;
        }

        // Save to localStorage
        localStorage.setItem('bioData', JSON.stringify(bioData));

        // Show success message
        showMessage('Bio data saved successfully! You can now return to the chatbot for personalized support.', 'success');

        // Redirect to chatbot after 3 seconds
        setTimeout(() => {
            window.location.href = 'chatbot.html';
        }, 3000);
    });

    function loadBioData() {
        const savedData = localStorage.getItem('bioData');
        if (savedData) {
            const bioData = JSON.parse(savedData);
            
            // Pre-fill form fields
            document.getElementById('name').value = bioData.name || '';
            document.getElementById('age').value = bioData.age || '';
            document.getElementById('gender').value = bioData.gender || '';
            document.getElementById('university').value = bioData.university || '';
            document.getElementById('year-of-study').value = bioData.yearOfStudy || '';
            document.getElementById('emergency-contact').value = bioData.emergencyContact || '';
            document.getElementById('emergency-phone').value = bioData.emergencyPhone || '';
            
            // Check checkboxes
            bioData.concerns.forEach(concern => {
                const checkbox = document.querySelector(`input[name="concerns"][value="${concern}"]`);
                if (checkbox) checkbox.checked = true;
            });
            
            bioData.preferences.forEach(preference => {
                const checkbox = document.querySelector(`input[name="preferences"][value="${preference}"]`);
                if (checkbox) checkbox.checked = true;
            });
            
            document.getElementById('consent').checked = bioData.consent || false;
        }
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
});
