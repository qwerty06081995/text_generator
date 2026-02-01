import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendText = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();

      if (data.error) {
        setResponse("Ошибка: " + data.error);
      } else {
        setResponse(data.response);
      }

    } catch (err) {
      setResponse("Ошибка соединения с сервером");
    }

    setLoading(false);
  };

  // 🎤 Голосовой ввод
  const startVoiceInput = () => {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Браузер не поддерживает Web Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.start();

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
  };

  return (
      <div className="container mt-5">
        <h3 className="mb-3">💬 Cohere AI</h3>

        <textarea
            className="form-control mb-2"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст..."
        />

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={sendText}>
            Отправить
          </button>

          <button className="btn btn-outline-secondary" onClick={startVoiceInput}>
            🎤
          </button>
        </div>

        {loading && <div className="mt-3">⏳ Загрузка...</div>}

        {response && (
            <div className="alert alert-success mt-3">
              {response}
            </div>
        )}
      </div>
  );
}

export default App;
