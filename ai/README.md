```
brew install 3.9

poetry env remove python
poetry env use 3.9
poetry shell

poetry lock
poetry install

python -m pip install setuptools wheel
python -m pip install -U audiocraft

.venv/bin/uvicorn main:app --reload
```
