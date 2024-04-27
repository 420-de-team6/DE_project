from transformers import AutoProcessor, MusicgenForConditionalGeneration

import scipy

import librosa
from pydub import AudioSegment


def generate_music(input_file, output_file, input_prompt, target_sample_rate=32000):
    
    # 초기값

    # input_prompt = "jazzy track with groovy saxophone"
    # input_file = "newjeans.wav"
    # output_file = "output.wav"
    # target_sample_rate = 32000
    
    mp3 = AudioSegment.from_file(input_file, format='mp3')
    wav = mp3.set_frame_rate(target_sample_rate).set_channels(1)

    # get pretrained model

    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

    # load audio file

    data, sample_rate = librosa.load(wav, sr=target_sample_rate)

    # generate audio

    inputs = processor(
        audio=data,
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
    scipy.io.wavfile.write(output_file, rate=sampling_rate, data=audio_values[0, 0].numpy())
    return output_file
    # sampling_rate = model.config.audio_encoder.sampling_rate
    # Audio(audio_values[0].numpy(), rate=sampling_rate)
