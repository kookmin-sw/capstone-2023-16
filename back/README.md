## Running the server

### Requirements

- Python 3.11
- Docker

### Docker로 서버 실행하기

`docker-compose up`

### 로컬에서 개발할 때 서버 띄우기 Script

```
brew install mysql
brew install mysql-connector-c

docker-compose up mysql ;; mysql db 띄우기

poetry install
```

### 개발시 참고

`PyCharm` 등에서 Poetry의 virtual env 를 사용해서 개발.

### GraphQL 실행창 띄우기

http://127.0.0.1:8000/graphql
