from flask import Flask, request, jsonify, render_template
import util

app = Flask(__name__)

@app.route('/')
def render_html():
    return render_template('app.html')



@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bedroom = int(request.form['bedroom'])
    bath = int(request.form['bath'])
    balcony = int(request.form['balcony'])


    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bedroom,bath,balcony)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()