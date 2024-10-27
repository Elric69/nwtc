import requests
from flask import (
    Flask,
    render_template,
    jsonify,
    request
)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/getData", methods =["GET","POST"])
def fetch():
    try:
        data = request.json
        message = data.get("message")
        url = f"http://api.brainshop.ai/get?bid=180356&key=6DRvcrqFlApaokis&uid=1&msg={message}"
        res = requests.get(url)
        response = res.json()
        return jsonify(response)
    except:
        print("error")


if __name__ == "__main__":
    app.run(port = 1234, debug = True)
