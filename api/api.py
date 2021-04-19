from tensorflow import keras
import tensorflow as tf
from flask import Flask, render_template, request, send_from_directory, url_for
import numpy as np
import re
import sys
import os
import base64
import random
import json
from PIL import Image
from io import BytesIO
sys.path.append(os.path.abspath("./model"))
from load import *

model = init()

app = Flask(__name__)

def runPrediction(img):
    size = (180, 180)
    img = img.resize(size)

    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    class_names = ['parasitized', 'uninfected']

    className = class_names[np.argmax(score)]
    confidence = 100 * np.max(score)

    dictionary = {"className": className, "confidence": confidence}

    return dictionary

@app.route('/predict', methods=['GET', 'POST'])
def predict():

    data = request.form['image']
    image_data = re.sub('^data:image/.+;base64,', '', data)
    img = Image.open(BytesIO(base64.b64decode(image_data))).convert('RGB')

    return runPrediction(img)


@app.route('/images', methods=['GET'])
def images():

    numfiles = 16

    with open('./static/images.json') as json_file:
        json_data = json_file.read()
    
    data = json.loads(json_data)
    lst = random.sample(list(data), numfiles)

    return { "cells" : lst }


if __name__ == '__main__':
    app.run(debug=True)
