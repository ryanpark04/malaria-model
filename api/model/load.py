import tensorflow as tf

def init():
	json_file = open('./model/model.json','r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = tf.keras.models.model_from_json(loaded_model_json)

	loaded_model.load_weights('./model/model.h5')

	loaded_model.compile(loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), optimizer='adam', metrics=['accuracy'])

	return loaded_model