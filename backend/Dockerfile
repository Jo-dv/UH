FROM openjdk:17
EXPOSE 8081
<<<<<<< HEAD

# 빌드 파일 경로 지정
ARG JAR_FILE=build/libs/*.jar

# 빌드 파일 app.jar로 지정 후
=======
WORKDIR /app
ARG JAR_FILE=./build/libs/uh-0.0.1-SNAPSHOT.jar
>>>>>>> 93c18c2debab931d50da18e06823b0026278b11c
COPY ${JAR_FILE} app.jar

# 빌드 파일 지정된 경로로 복사
COPY build/libs/*.jar application.jar


ENTRYPOINT ["java", "-jar", "/app.jar"]