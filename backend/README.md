# 백엔드 서버 실행 방법

반드시 가상 환경을 만들어서 사용해주세요!
일부 모듈이 가상 환경 내에서만 동작합니다.

1. 파이썬 가상 환경 실행

```sh
virtualenv .venv
```

2. requirements 설치

```
pip install -r requirements.txt
```

3. 백엔드 서버 실행(가상 환경 내에 설치된 uvicorn으로 실행해야 합니다.)

```
.venv/bin/uvicorn main:app --reload
```
