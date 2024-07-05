from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  
model = load_model('pneu.h5')

def preprocess_image(img_file):
    img = Image.open(img_file).convert('L')  
    img = img.resize((128, 128)) 
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  
    img_array /= 255.0  
    return img_array

@app.route('/predict/chest', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        new_image = preprocess_image(file)
        prediction = model.predict(new_image)
        predicted_class = 1 if prediction > 0.5 else 0

        return jsonify({
            'predicted_class': predicted_class,
            'class_probabilities': {
                'Class 0': float(1 - prediction[0][0]),
                'Class 1': float(prediction[0][0])
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
