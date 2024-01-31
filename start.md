# docker

```
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0
```

# Server

```
cd backend
./gradlew
./gradlew jar
./gradlew bootRun
```

서버 키는 방법
backend/src/main/java/UhApplication.java
실행

# Front

```
cd frontend
npm start
```
