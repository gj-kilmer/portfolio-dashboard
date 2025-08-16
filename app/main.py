import os
from flask import Flask, jsonify
app = Flask(__name__)

APP_VERSION = (os.getenv("APP_VERSION") or "dev").strip()
BUILD_DATE  = (os.getenv("BUILD_DATE")  or "unknown").strip()
@app.route("/health")
def health():
    return jsonify(status="ok", version=APP_VERSION, build_date=BUILD_DATE), 200
@app.route('/')
def home():
    return "Hello from Elastic Beanstalk!!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)