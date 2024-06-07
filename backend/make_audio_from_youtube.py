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
    
def audio_extractor(playlist_urls, output_folder):
    def download_video(video_url, output_path):
        try:
            yt = YouTube(video_url)
            video = yt.streams.filter(only_audio=True).first()
            output_file = video.download(output_path=output_path)
            return output_file
        except Exception as e:
            print(f"An error occurred downloading {video_url}: {e}")
            return None

    def convert_to_wav(video_path, output_filename):
        try:
            audio = AudioFileClip(video_path)
            wav_path = os.path.join(output_folder, output_filename)
            audio.write_audiofile(wav_path, codec='pcm_s16le')
            audio.close()
            os.remove(video_path)  # Remove the video file after conversion
            return wav_path
        except Exception as e:
            print(f"An error occurred converting {video_path} to wav: {e}")
            return None

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    filenames = ["main.wav", "sub.wav"]
    video_paths = []
    for index, (video_url, filename) in enumerate(zip(playlist_urls, filenames)):
        print(f"Processing video {
              index + 1}/{len(playlist_urls)}: {video_url}")
        video_path = download_video(video_url, output_folder)
        if video_path:
            wav_path = convert_to_wav(video_path, filename)
            if wav_path:
                print(f"Successfully converted and saved: {wav_path}")
            else:
                print(f"Failed to convert video to wav: {video_path}")
        else:
            print(f"Failed to download video: {video_url}")
        video_paths.append(wav_path)
    return video_paths

def title_url_pairs(url):
    try:
        playlist = Playlist(url)
        titles = [video.title for video in playlist.videos]
        video_links = [video_url for video_url in playlist.video_urls]
        dic = {title: link for title, link in zip(titles, video_links)}
        return dic
    except Exception as e:
        return str(e)

def copy_file(source_folder, destination_folder):

    # 대상 폴더가 존재하지 않으면 생성합니다.
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    # 소스 폴더의 모든 파일을 반복 처리합니다.
    for filename in os.listdir(source_folder):
        source_file = os.path.join(source_folder, filename)
        destination_file = os.path.join(destination_folder, filename)
        
        try:
            # 파일이 실제로 파일인 경우에만 복사합니다.
            if os.path.isfile(source_file):
                shutil.copy2(source_file, destination_file)  # 메타데이터(타임스탬프 등) 포함 복사
            elif os.path.isdir(source_file):
                # 디렉토리인 경우 디렉토리 자체를 복사
                shutil.copytree(source_file, destination_file)
        except Exception as e:
            print(f"Failed to copy {source_file} to {destination_file}. Reason: {e}")
    