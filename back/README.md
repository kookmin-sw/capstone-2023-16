본 디렉토리를 서버의 루트 디렉토리로 사용해 주세요.

## Running the server
### Requirements
- Python 3.11
- Docker

### 서버 띄우기 Script
```
brew install mysql
brew install mysql-connector-c

docker-compose up -d ;; mysql db 띄우기

python -m venv venv
pip install -r requirements.txt
python manage.py runserver
```


### GraphQL 실행창 띄우기
http://127.0.0.1:8000/graphql
