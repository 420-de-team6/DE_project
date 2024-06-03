from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import List
from  classification import clf
from demo_musicgen import generate_music
import pygame
import io
from pydantic import BaseModel
import make_audio_from_youtube
import os
import shutil
app = FastAPI()
global music 
music =None
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # 모든 origin을 허용하려면 "*"을 사용합니다. 필요에 따라 원하는 origin을 명시할 수 있습니다.
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # 허용할 HTTP 메서드를 지정합니다.
    allow_headers=[
        "*"
    ],  # 모든 헤더를 허용하려면 "*"을 사용합니다. 필요에 따라 원하는 헤더를 명시할 수 있습니다.
)
pygame.mixer.init()


@app.get("/")
async def root():
    print("success")
    return {"message": "Hello World"}

class SaveData(BaseModel):
    inputValue1: str
class SelectMusic(BaseModel):
    MainMusic: str
    SubMusic: str
@app.post("/save")
async def mix_music(data: SaveData):
    print("selected music:", data.inputValue1)
    global music
    music=make_audio_from_youtube.download(data.inputValue1)
    print(music)
    return {"music_list": music, "message": "true"}

@app.get("/next")
async def next_stage():
    global music
    return {"music_list": music}

@app.post("/select")
async def Select_Two_Music(data: SelectMusic):
    print(data.MainMusic, data.SubMusic)
    main_path = "C:/Users/daniel/Desktop/DE_project/backend/Music/download/" + data.MainMusic
    sub_path = "C:/Users/daniel/Desktop/DE_project/backend/Music/download/" + data.SubMusic
    destination_dir = "C:/Users/daniel/Desktop/DE_project/frontend/src/Music/music_file"
    if not os.path.exists(main_path):
        raise HTTPException(status_code=404, detail=f"MainMusic file not found: {main_path}")
    if not os.path.exists(sub_path):
        raise HTTPException(status_code=404, detail=f"SubMusic file not found: {sub_path}")
    
    # Ensure the destination directory exists
    os.makedirs(destination_dir, exist_ok=True)
    
    # Define the destination paths
    main_dest_path = os.path.join(destination_dir, "main.wav")
    sub_dest_path = os.path.join(destination_dir, "sub.wav")
    
    # Copy the files to the destination directory
    try:
        shutil.copy2(main_path, main_dest_path)
        shutil.copy2(sub_path, sub_dest_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error copying files: {str(e)}")
    
    return {
        "main_path": main_dest_path,
        "sub_path": sub_dest_path,
        "message": "Files copied successfully"
    }
    
@app.post("/Mix_music")
async def mix_music(data: SelectMusic):
    main_path = "C:/Users/daniel/Desktop/DE_project/backend/Music/download/" + data.MainMusic
    sub_path = "C:/Users/daniel/Desktop/DE_project/backend/Music/download/" + data.SubMusic
    output= "C:/Users/daniel/Desktop/DE_project/backend/Music/result/output.wav"
    destination_dir = "C:/Users/daniel/Desktop/DE_project/frontend/src/Music/output"
    if not os.path.exists(output):
        raise HTTPException(status_code=404, detail=f"Output file not found: {output}")

    os.makedirs(destination_dir, exist_ok=True)
    output_path = os.path.join(destination_dir, "output.wav")

    try:
        shutil.copy2(output, output_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error copying files: {str(e)}")
    print("결과반환")
    # print('file_get:', selected_files)
    # selectedFile1 = selected_files.get("selectedFile1")
    # selectedFile2 = selected_files.get("selectedFile2")
    # print("Selected audio files:", selectedFile1, selectedFile2)
    # file_name1, file_name2 = get_audio_file(selectedFile1, selectedFile2)
    # print('get_audio_file finish')
    # paths = [file_name1[0], file_name2[0]]
    # print(clf())
    # print('clf finish')
    # audio_file = generate_music(file_name1[1], "output.wav", clf(paths)[1], 32000)
    # print('generate_music finish')
    # audio_data = open("output.wav", "rb").read()
    # return StreamingResponse(io.BytesIO(audio_data), media_type="audio/wav")
    return 1
