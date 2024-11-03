from flask import Flask, render_template, request, jsonify
import aiohttp
import asyncio

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/getData", methods=["GET", "POST"])
def dataFetch():
    userMessage = request.args.get("mes")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(fetch_data(userMessage))
    return jsonify(result)

async def fetch_data(userMessage):
    url = f"http://api.brainshop.ai/get?bid=180356&key=6DRvcrqFlApaokis&uid=2234189&msg={userMessage}"
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url) as response:
                data = await response.json()
                return data
        except Exception as e:
            print("Error:", e)
            return {"error": "Failed to fetch data"}

if __name__ == "__main__":
    app.run(debug=True)
