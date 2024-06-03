from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from generate import generate_music

# from demo_musicgen import generate_music
import uvicorn
import io
from fastapi.responses import StreamingResponse, FileResponse
from typing import Dict

app = FastAPI()


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


@app.get("/")
async def root():
    print("success")
    return {"message": "Hello World"}


@app.post("/generate")
async def generate(
    file: UploadFile = File(...), prompt: str = Form(...), start_time: int = Form(0)
):

    print(file)
    print("prompt:" + prompt)
    audio = await generate_music(
        input_file=await file.read(),
        # file=file,
        input_prompt=prompt,
        output_file="/tmp/${file.filename}",
        max_length=750,
        max_new_tokens=750,
        start_time=start_time,
    )

    return StreamingResponse(audio, media_type="audio/wav")


if __name__ == "__main__":
    uvicorn.run(app, host="", port=8000)
