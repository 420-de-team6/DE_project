# from pytube import YouTube
import joblib
import os
import pandas as pd
import numpy as np
# from moviepy.editor import *
from sklearn.preprocessing import StandardScaler
from keras.models import load_model
from features_ import *

# 이후에 features_ 모듈의 함수를 사용할 수 있습니다.


model = load_model(os.getcwd() + '/new_ensemble_mel.h5')

class Classification:
    def __init__(self, paths):
        # self.links = links
        self.features = pd.DataFrame(
            index=[1, 2], columns=features_.columns(), dtype=np.float32)

        # PATH = os.getcwd()
        # os.makedirs(name=PATH + '\musics', exist_ok=True)
        self.paths = paths

    # def audioExtraction(self):
    #     for i, link in enumerate(self.links, start=1):
    #         yt = YouTube(link)
    #         temp_audio_path = yt.streams.filter(only_audio=True, file_extension='mp4').first(
    #         ).download(output_path=self.path, filename=self.path + r'\music' + str(i) + '.mp4')
    #         FILETOCONVERT = AudioFileClip(temp_audio_path)
    #         FILETOCONVERT.write_audiofile(
    #             self.path + r'\music' + str(i) + '.mp3')
    #         FILETOCONVERT.close()
    #         os.remove(temp_audio_path)

    def featureGen(self):
        for i in range(1, 3):
            # filepath = self.path + '\music' + str(i) + '.mp3'
            feature = features_.compute_features(self.paths[i-1]).astype(np.float32)
            self.features.loc[i] = feature
        print(self.features)

    def fit(self):
        scaler = StandardScaler(copy=False)
        x = self.features.loc[:, 'mfcc']
        scaled_x = scaler.fit_transform(x)
        y = SVC.predict(scaled_x)
        return y


def clf(paths):
    MGC = Classification(paths)
    MGC.featureGen()
    genres = MGC.fit()

    return genres

