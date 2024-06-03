import librosa
from keras.models import load_model
import numpy as np
import os
import random

def classification(path):
    bad_index = []

    y, _ = librosa.load(path)
    y = y[:661794]

    # Mel-Spectrogram
    M = librosa.feature.melspectrogram(y=y)
    M_db = librosa.power_to_db(M)
    Mel = np.delete(M_db, bad_index, 0).astype(np.float32)


    model = load_model(os.getcwd() + '/new_ensemble_mel.h5')
    genre_map = {
        0: 'blues',
        1: 'classical',
        2: 'country',
        3: 'disco',
        4: 'hiphop',
        5: 'jazz',
        6: 'metal',
        7: 'pop',
        8: 'reggae',
        9: 'rock'
    }
    prompting_map = {

        "blues": ["soulful", "melancholic", "expressive", "deep", "nostalgic"],
        "classical": ["elegant", "intricate", "timeless", "refined", "majestic"],
        "country": ["rustic", "heartfelt", "down-to-earth", "twangy", "narrative"],
        "disco": ["groovy", "vibrant", "danceable", "flashy", "upbeat"],
        "hiphop": ["rhythmic", "dynamic", "urban", "lyrical", "bold"],
        "jazz": ["smooth", "improvisational", "sophisticated", "cool", "complex"],
        "metal": ["intense", "powerful", "aggressive", "heavy", "raw"],
        "pop": ["catchy", "upbeat", "mainstream", "trendy", "melodic"],
        "reggae": ["laid-back", "rhythmic", "island-inspired", "mellow", "rootsy"],
        "rock": ["energetic", "rebellious", "electrifying", "gritty", "anthemic"]
    }

    reshaped_Mel = Mel.reshape((1, 128, 1293, 1))
    genre = model.predict(reshaped_Mel)
    genre = np.argmax(genre)
    genre = genre_map[genre]
    random_adjectives = random.choice(prompting_map[genre])
    return random_adjectives + " " + genre
