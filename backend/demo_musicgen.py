# %pip install transformers
from transformers import AutoProcessor, MusicgenForConditionalGeneration

import scipy

import librosa
from pydub import AudioSegment
import numpy as np
import io
from datasets import load_dataset
from scipy.io import wavfile


def convert_mp3_to_wav(input_file):
    mp3 = AudioSegment.from_file(input_file, format="mp3")
    buffer = io.BytesIO()
    mp3.export(
        buffer,
        format="wav",
    )
    buffer.seek(0)
    return buffer


def load_wav_to_numpy(wav):
    wav.seek(0)
    y, sr = librosa.load(wav, sr=32000, dtype=np.float32)

    return y, sr


def generate_music(input_file, output_file, input_prompt, target_sample_rate=32000):

    # 초기값

    # input_prompt = "jazzy track with groovy saxophone"
    # input_file = "newjeans.wav"
    # output_file = "output.wav"
    # target_sample_rate = 32000

    # buffer = io.BytesIO()

    # wav = np.frombuffer(
    #     mp3.set_frame_rate(target_sample_rate)
    #     .set_channels(1)
    #     .export(format="wav")
    #     .read(),
    # )

    # get pretrained model

    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

    # wav = convert_mp3_to_wav(input_file)
    AudioSegment.from_file(input_file, format="mp3", sample_rate=32000).set_frame_rate(
        32000
    ).set_channels(1).export("temporary.wav", format="wav")
    sample_rate, data = wavfile.read("temporary.wav")
    print(sample_rate, data.shape)

    # data, sample_rate = load_wav_to_numpy(wav)
    # mp3 = AudioSegment.from_file(input_file, format="mp3")

    # dataset = load_dataset("sanchit-gandhi/gtzan", split="train", streaming=True)
    # sample = next(iter(dataset))["audio"]
    # print(dataset)

    # print(wav)
    # load audio file

    # data, sample_rate = librosa.load(wav, sr=target_sample_rate)

    # generate audio
    # print(sample)
    # print(sample["array"].shape)
    # print(data, sample_rate)
    # print(data.shape)

    data = np.array(data, copy=False).astype("float32")

    inputs = processor(
        audio=data[:30000],
        sampling_rate=sample_rate,
        text=[input_prompt],
        padding=True,
        return_tensors="pt",
    )
    audio_values = model.generate(
        **inputs, do_sample=True, guidance_scale=3, max_new_tokens=256
    )

    # generate wave audio file
    sampling_rate = model.config.audio_encoder.sampling_rate
    scipy.io.wavfile.write(
        output_file, rate=sampling_rate, data=audio_values[0, 0].numpy()
    )
    return output_file
    # sampling_rate = model.config.audio_encoder.sampling_rate
    # Audio(audio_values[0].numpy(), rate=sampling_rate)
