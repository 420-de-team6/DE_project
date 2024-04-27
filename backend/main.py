from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
from test import get_audio_file, find_path
from classification import clf
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin을 허용하려면 "*"을 사용합니다. 필요에 따라 원하는 origin을 명시할 수 있습니다.
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # 허용할 HTTP 메서드를 지정합니다.
    allow_headers=["*"],  # 모든 헤더를 허용하려면 "*"을 사용합니다. 필요에 따라 원하는 헤더를 명시할 수 있습니다.
)

@app.get("/")
async def root():
    print('success')
    return {"message": "Hello World"}


@app.post("/mix_music")
async def mix_music(selected_files: dict):
    selectedFile1 = selected_files.get("selectedFile1")
    selectedFile2 = selected_files.get("selectedFile2")
    print("Selected audio files:", selectedFile1, selectedFile2)
    file_name1, file_name2 = get_audio_file(selectedFile1, selectedFile2)
    paths = [file_name1, file_name2]
    print(clf(paths))
    print("Modified audio file names:", file_name1, file_name2)
    return JSONResponse(content={"message": "Audio files received successfully"})