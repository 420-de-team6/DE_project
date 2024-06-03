from pytube import YouTube

# YouTube('https://youtube.com/watch?v=...').streams.first().download()

from pytube import Playlist
import os
from pytube import Playlist, YouTube
from moviepy.editor import *
import os
import shutil
def get_playlist_titles(url):
    try:
        playlist = Playlist(url)
        titles = [video.title for video in playlist.videos]
        return titles
    except Exception as e:
        return str(e)
    
def get_playlist_video_links(playlist_url):
    try:
        playlist = Playlist(playlist_url)
        video_links = [video_url for video_url in playlist.video_urls]
        return video_links
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def delete_video():
        folder_path = './Music/download/'

        if not os.path.exists(folder_path):
            print(f"The folder path {folder_path} does not exist.")
        else:
            # 폴더 내 모든 파일 및 서브폴더 제거
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                try:
                    if os.path.isfile(file_path) or os.path.islink(file_path):
                        os.unlink(file_path)  # 파일 또는 심볼릭 링크 삭제
                    elif os.path.isdir(file_path):
                        shutil.rmtree(file_path)  # 디렉토리와 그 안의 모든 내용 삭제
                except Exception as e:
                    print(f"Failed to delete {file_path}. Reason: {e}")
    
def audio_extractor(list_url, output_folder):
    
                    
    def download_video(video_url, output_path):
            
        try:
            yt = YouTube(video_url)
            video = yt.streams.filter(only_audio=True).first()
            output_file = video.download(output_path=output_path)
            return output_file
        except Exception as e:
            print(f"An error occurred downloading {video_url}: {e}")
            return None

    def convert_to_wav(video_path):
        try:
            audio = AudioFileClip(video_path)
            # Extract the first `duration` seconds
            wav_path = os.path.splitext(video_path)[0] + '.wav'
            print(os.path.splitext(video_path))
            # Specify codec for WAV format
            audio.write_audiofile(wav_path, codec='pcm_s16le')
            audio.close()
            os.remove(video_path)  # Remove the video file after conversion
            return wav_path
        except Exception as e:
            print(f"An error occurred converting {video_path} to wav: {e}")
            return None

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    video_links = list_url
    for index, video_url in enumerate(video_links):
        name = 'main' if index == 0 else 'sub'
        print(f"Processing {name} video : {video_url}")
        video_path = download_video(video_url, output_folder)
        if video_path:
            wav_path = convert_to_wav(video_path)
            if wav_path:
                print(f"Successfully converted and saved: {wav_path}")
            else:
                print(f"Failed to convert video to wav: {video_path}")
        else:
            print(f"Failed to download video: {video_url}")

def title_url_pairs(url):
    try:
        playlist = Playlist(url)
        titles = [video.title for video in playlist.videos]
        video_links = [video_url for video_url in playlist.video_urls]
        dic = {title: link for title, link in zip(titles, video_links)}
        return dic
    except Exception as e:
        return str(e)