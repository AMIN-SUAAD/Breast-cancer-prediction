import pickle
import json

__data_columns = None
__model = None

def get_predicted_diagnosis(values):
    
    x = values
    
    return __model.predict(x)[0]

def load_saved_artifacts():
    global  __data_columns
    global __model

    with open("artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']

    with open('artifacts/predict_diagnosis_model.pickle', 'rb') as f:
        __model = pickle.load(f)

def get_data_columns():
    return __data_columns