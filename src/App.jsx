import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDhVQkv8Mm0K7_t_H1c83T20jQT7X-GiOQ",
      method: "post",
      data: {
        "contents": [{ "parts": [{ "text": question }] }]
      }
    });
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }

  function reset() {
    setQuestion("");
    setAnswer("");
  }

  return (
    <>
    <div className="container">
      <h1>My AI Bot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        disabled={answer !== ""}
        placeholder='Enter a prompt here'
      />
      <button onClick={generateAnswer} disabled={question === "" || answer !== ""}>
        Generate Answer
      </button>
      {answer && (
        <>
          <pre className={answer === "loading..." ? "loading" : ""}>{answer}</pre>
          <button onClick={reset}>Ask Another Question</button>
        </>
      )}
    </div>
    </>
  );
}

export default App;
