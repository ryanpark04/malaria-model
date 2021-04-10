from flask import Flask, render_template, request, send_from_directory, url_for
import numpy as np
import re
import sys 
import os
import base64
import random
import pathlib
import json
from PIL import Image
from io import BytesIO
sys.path.append(os.path.abspath("./model"))
from load import * 
import tensorflow as tf
from tensorflow import keras


model = init()

app = Flask(__name__)


def examplePrediction(path):
    img = Image.open(path).convert('RGB')

    return json.dumps(runPrediction(img))

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

    dictionary = { "className": className, "confidence": confidence }

    return dictionary

@app.route('/predict', methods=['GET', 'POST'])
def predict():

    data = request.form['image']
    image_data = re.sub('^data:image/.+;base64,', '', data)
    img = Image.open(BytesIO(base64.b64decode(image_data))).convert('RGB')

    return runPrediction(img)

@app.route('/images', methods=['GET'])
def images():

    parasitized_path = "./static/parasitized/"
    uninfected_path = "./static/uninfected/"

    numfiles = 16

    nump = random.randrange(numfiles)
    numu = numfiles - nump
    
    pdir = os.listdir(parasitized_path)
    udir = os.listdir(uninfected_path)

    pfiles = random.sample(pdir, nump)
    ufiles = random.sample(udir, numu)

    lst = []

    for fileName in pfiles:
        path = parasitized_path + fileName
        with open(path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        json_prediction = examplePrediction(path)
        json_url = { "url": "data:image/png;base64,{}".format(encoded_string), "name": fileName }
        appended = json.loads(json_prediction)
        appended.update(json_url)
        lst.append(appended)

    for fileName in ufiles:
        path = uninfected_path + fileName
        with open(path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        json_url = { "url": "data:image/png;base64,{}".format(encoded_string), "name": fileName }
        json_prediction = examplePrediction(path)
        appended = json.loads(json_prediction)
        appended.update(json_url)
        lst.append(appended)

    random.shuffle(lst)

    return { "cells": lst }

if __name__ == '__main__':
    app.run(debug=True)