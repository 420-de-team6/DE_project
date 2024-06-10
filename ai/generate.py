from transformers import AutoProcessor, MusicgenForConditionalGeneration
from scipy.io import wavfile
import numpy as np

import io
import librosa


async def generate_music(
    input_file,
    output_file,
    input_prompt,
    target_sample_rate=32000,
    max_length=750,  # 50 = 1s
    max_new_tokens=750,  # 50 = 1s
    start_time=0,  # 50 = 1s
):
    print("start generate_music")
    # print(input_prompt)
    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
    model.generation_config.max_length = 1500

    print("Call audio file")
    # Convert input_file to a BytesIO object
    # input_file.seek(0)

    byte_io = io.BytesIO(input_file)

    # Load the audio data using librosa
    data, sample_rate = librosa.load(byte_io)

    # data, sample_rate = librosa.load(input_file)
    data = librosa.resample(data, orig_sr=sample_rate, target_sr=target_sample_rate)
    np.array(data[1], dtype=np.float32)

    data = np.array(data, copy=False).astype("float32")
    data = data[start_time : max_length + start_time]

    print("Call model.generate")
    inputs = processor(
        audio=data,
        sampling_rate=target_sample_rate,
        text=[input_prompt],
        padding=True,
        return_tensors="pt",
    )

    print(*inputs)

    model_kwargs = {
        "input_ids": inputs["input_ids"],
        "attention_mask": inputs["attention_mask"],
    }

    audio_values = model.generate(
        **model_kwargs,
        do_sample=True,
        guidance_scale=3,
        max_new_tokens=max_new_tokens,
    )

    bytes_wav = bytes()
    byte_io = io.BytesIO(bytes_wav)
    wavfile.write(byte_io, rate=target_sample_rate, data=audio_values[0, 0].numpy())
    result = io.BytesIO(byte_io.read())
    result.seek(0)

    # print("Write output file")
    # wavfile.write(output_file, rate=target_sample_rate, data=audio_values[0, 0].numpy())
    return result
