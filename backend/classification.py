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

    model = load_model(os.getcwd() + "/new_ensemble_mel.h5")
    genre_map = {
        0: "blues",
        1: "classical",
        2: "country",
        3: "disco",
        4: "hiphop",
        5: "jazz",
        6: "metal",
        7: "pop",
        8: "reggae",
        9: "rock",
    }
    prompting_map = {
        "blues": [
            "Raw and acoustic Delta blues",
            "Electric and urban Chicago blues",
            "Gritty guitar solos Blues rock",
            "Emotional and heartfelt Soul blues",
            "Modern and innovative Contemporary blues",
        ],
        "classical": [
            "Ornate and complex Baroque music",
            "Elegant and structured Classical era music",
            "Expressive and dramatic Romantic era music",
            "Avant-garde and experimental Modern classical music",
            "Repetitive and hypnotic Minimalism",
        ],
        "country": [
            "Traditional storytelling Classic country",
            "Energetic and rebellious Country rock",
            "Fast-paced and acoustic Bluegrass",
            "Polished and pop-influenced Contemporary country",
            "Raw and rebellious Outlaw country",
        ],
        "disco": [
            "Funky and danceable 70s disco",
            "Electronic and vibrant Euro disco",
            "Groove-heavy and smooth Post-disco",
            "Modern and retro-inspired Nu-disco",
            "Catchy and electronic Italo disco",
        ],
        "hiphop": [
            "Rhythmic and foundational Old school hip-hop",
            "Lyrically complex and innovative Golden age hip-hop",
            "Raw and gritty Gangsta rap",
            "Experimental and eclectic Alternative hip-hop",
            "Bass-heavy and modern Trap",
        ],
        "jazz": [
            "Fast and intricate Bebop",
            "Relaxed and smooth Cool jazz",
            "Avant-garde and experimental Free jazz",
            "Electrified and genre-blending Fusion",
            "Easygoing and melodic Smooth jazz",
        ],
        "metal": [
            "Powerful and classic Heavy metal",
            "Fast and aggressive Thrash metal",
            "Dark and atmospheric Black metal",
            "Brutal and intense Death metal",
            "Orchestral and epic Symphonic metal",
        ],
        "pop": [
            "Synth-heavy and catchy 80s pop",
            "Sweet and simplistic Bubblegum pop",
            "Upbeat and rhythmic Dance-pop",
            "Quirky and melodic Indie pop",
            "Electronic and vibrant Electropop",
        ],
        "reggae": [
            "Spiritual and soulful Roots reggae",
            "Echoing and experimental Dub",
            "Upbeat and rhythmic Dancehall",
            "Latin-influenced and energetic Reggaeton",
            "Romantic and smooth Lovers rock",
        ],
        "rock": [
            "Iconic and anthemic Classic rock",
            "Fast and rebellious Punk rock",
            "Edgy and innovative Alternative rock",
            "Powerful and intense Hard rock",
            "Independent and eclectic Indie rock",
        ],
    }

    reshaped_Mel = Mel.reshape((1, 128, 1293, 1))
    genre = model.predict(reshaped_Mel)
    genre = np.argmax(genre)
    genre = genre_map[genre]
    random_adjectives = random.choice(prompting_map[genre])
    return random_adjectives
