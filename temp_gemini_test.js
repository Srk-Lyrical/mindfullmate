const GEMINI_API_KEY = 'AlzaSyB1yNWC-QIxFto2Phs0vfHf4JMWAPhUX1A';

async function testGemini() {
  const prompt = `You are Mindfulmate, an AI mental health support chatbot for higher education students. Provide empathetic, supportive responses focused on mental health, stress management, and well-being. Encourage seeking professional help when appropriate. User message: Hello, how are you?`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Success! Response:', data.candidates[0].content.parts[0].text.trim());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGemini();
