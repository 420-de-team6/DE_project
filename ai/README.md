# Generative AI Model(MusicGen)

음악을 생성하는 MusicGen 모델과 관련된 소스 코드입니다.

## 환경 설정 방법

MacOS 기준

1. python 3.9 설치
   `brew install python3.9`

2. poetry install
   `brew install poetry`

3. (optional)기존에 python 설정이 있고 필요없다면 지우기
   `deactivate`
   `conda deactivate`
   `poetry env remove python`

4. poetry 환경 설정
   `poetry env use 3.9`
   `poetry shell`
   `poetry lock`
   `poetry install`

5. 기타 의존성 설치
   `python -m pip install setuptools wheel`
   `python -m pip install -U audiocraft`

   pyproject.toml 형식으로 설치할 수 없는 의존성 패키지들입니다.

6. 실행
   `.venv/bin/uvicorn main:app --reload`

7. 생성 요청

   ```
   POST http://localhost:8000/generate
   Request: {
    file: UploadFile
    prompt: string
    start_time: int
   }
   Response: File
   ```
