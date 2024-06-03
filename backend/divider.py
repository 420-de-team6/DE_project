from moviepy.editor import *


def audio_divider(paths, start, duration=35):
    def time_string_to_seconds(time_str):
        minutes, seconds = map(int, time_str.split(':'))
        total_seconds = minutes * 60 + seconds
        return total_seconds
    try:
        output_path = './Music/divided'
        #'C:/Users/daniel/Desktop/DE_project/backend/Music/divided'
        start_time = time_string_to_seconds(start)

        main = AudioFileClip(paths[0])
        main = main.subclip(start_time, start_time+15)

        sub = AudioFileClip(paths[1])
        sub = sub.subclip(0, duration)

        main.write_audiofile(output_path + '/main.wav', codec='pcm_s16le')
        sub.write_audiofile(output_path + '/sub.wav', codec='pcm_s16le')
        main.close()
        sub.close()
    except Exception as e:
        print(f"An error occurred converting {paths} to wav: {e}")
        return None
