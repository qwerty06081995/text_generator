backend -> python/flask
frontend -> react

# чтобы запустить backend нужно python 3.12 версия

```python
python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows

pip install -r requirements.txt
flask run
```
если не сработал
```python
pip install flask flask-cors cohere python-dotenv
flask run
```
# чтобы запустить frontend 
```npm
npm install
npm start
```
