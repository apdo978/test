const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require('cors')
require('dotenv').config();


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.post('/chat', async (req, res) => {
  console.log(process.env.API_KEY);
  
  const { message } = req.body;
  console.log(message);
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    if (!data.choices) {
      return res.status(500).json({ error: "Failed to fetch response" });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})