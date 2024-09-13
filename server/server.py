from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import util

app = Flask(__name__)
CORS(app)


@app.route("/predict_diagnosis", methods=["POST"])
def predict_diagnosis():

    data = request.get_json()

    order = ["radius_mean",
             "texture_mean",
             "perimeter_mean",
             "area_mean",
             "smoothness_mean",
             "compactness_mean",
             "concavity_mean",
             "concave_points_mean",
             "symmetry_mean",
             "fractal_dimension_mean",
             "radius_se",
             "texture_se",
             "perimeter_se",
             "area_se",
             "smoothness_se",
             "compactness_se",
             "concavity_se",
             "concave_points_se",
             "symmetry_se",
             "fractal_dimension_se",
             "radius_worst",
             "texture_worst",
             "perimeter_worst",
             "area_worst",
             "smoothness_worst",
             "compactness_worst",
             "concavity_worst",
             "concave_points_worst",
             "symmetry_worst",
             "fractal_dimension_worst"]

    sorted_data = {key: data[key] for key in order}

    values = [float(value) for value in sorted_data.values()]

    values_df = pd.DataFrame(np.array([values]), columns=order)

    response = jsonify({
        "predicted_diagnosis": util.get_predicted_diagnosis(values_df)
    })
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response


if __name__ == "__main__":
    util.load_saved_artifacts()
    app.run()
