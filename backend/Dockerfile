FROM java:17
EXPOSE 8081

# 빌드 파일 경로 지정
ARG JAR_FILE=build/libs/*.jar

# 빌드 파일 app.jar로 지정 후
COPY ${JAR_FILE} app.jar

# 빌드 파일 지정된 경로로 복사
COPY build/libs/*.jar application.jar


ENTRYPOINT ["java", "-jar", "/app.jar"]