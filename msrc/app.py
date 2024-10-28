import requests
import random
from flask import (
    Flask,
    render_template,
    request,
    jsonify
)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/getData", methods = ["GET"])
def dataFetch():
    userMessage = request.args.get("mes")
    url = f"http://api.brainshop.ai/get?bid=180356&key=6DRvcrqFlApaokis&uid=159760814&msg={userMessage}"
    try:
        response = requests.get(url)
        return jsonify(response.json())
    except:
        print("error")

if __name__ == "__main__":
    app.run(port = random.randint(1000,9999), debug = True)
