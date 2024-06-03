from pytube import YouTube

# YouTube('https://youtube.com/watch?v=...').streams.first().download()

from pytube import Playlist
import os
from pydub import AudioSegment

def download(Path=str):
    DOWNLOAD_DIR = "./Music/download"
    src = []
    file_list=None
    #기존 오디오 파일 삭제
    print("기존 오디오 파일 삭제")
    if os.listdir("./Music/download"):
        file_list = os.listdir("./Music/download")
        for file_name in file_list:
            try:   
                os.remove(os.path.join(DOWNLOAD_DIR, file_name))
            except FileNotFoundError:
                pass
            except Exception as e:
                pass

    #동영상 다운로드
    playlist = Path
    p = Playlist(playlist)
    print("동영상 다운로드")
    for video in p.videos:
        try:
            video.streams.first().download(DOWNLOAD_DIR)
        except:
            print(str(video), "을 다운로드 받는 중에 문제가 발생했습니다.")
            pass
    #동영상을 오디오로
    print("동영상 변환")
    for file_name in file_list:
        try:
            sound = AudioSegment.from_file(os.path.join(DOWNLOAD_DIR, file_name), format="mp4")
            sound.export(os.path.join(DOWNLOAD_DIR, file_name[:-4] + '.wav'), format="wav")
            src.append(file_name[:-4]+'.wav')
            try:
            
                os.remove(os.path.join(DOWNLOAD_DIR, file_name))
                print(f"{DOWNLOAD_DIR+file_name}가 삭제되었습니다.")
            except FileNotFoundError:
                print(DOWNLOAD_DIR+file_name)
                print(f"파일이 이미 삭제되었거나 존재하지 않습니다.")
            except Exception as e:
                print(f"파일 삭제 중 오류가 발생했습니다: {e}")
        except:
            print(f"Error processing file {file_name}")
    return src
