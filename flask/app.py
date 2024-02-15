from flask import Flask, abort, request
from flask_cors import CORS
from tempfile import NamedTemporaryFile
import whisper
# from whisper_jax import FlaxWhisperPipline
# import jax.numpy as jnp
import os
import torch

# DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DEVICE = "cpu"
# Load the Whisper model:

# pipeline = FlaxWhisperPipline("openai/whisper-base", dtype=jnp.float16)
model = whisper.load_model("base", device=DEVICE)

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Whisper Hello World!"


@app.route('/stt', methods=['POST'])
def handler():
    if not request.files:
        # If the user didn't submit any files, return a 400 (Bad Request) error.
        abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = []

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile(delete=False)
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        # result = pipeline(temp.name)
        result = model.transcribe(temp.name,language="korean")
        # Now we can store the result object for this file.
        results.append({
            'filename': filename,
            'transcript': result['text'],
        })

        temp.close()
        os.remove(temp.name)

    # This will be automatically converted to JSON.
    return {'results': results}