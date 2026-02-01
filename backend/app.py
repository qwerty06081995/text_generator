import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere

app = Flask(__name__)
CORS(app)

co = cohere.Client(os.getenv("COHERE_API_KEY"))


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("text")

    if not prompt:
        return jsonify({"error": "Текст не передан"}), 400

    try:
        print(prompt)
        # response = co.generate(
        #     model="command",
        #     prompt=prompt,
        #     max_tokens=200,
        #     temperature=0.7
        # )
        response = co.chat(
            model="command-a-03-2025",
            message=prompt
        )
        return jsonify({
            "response": response.text.strip()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
