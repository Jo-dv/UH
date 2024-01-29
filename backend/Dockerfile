FROM openjdk:17
EXPOSE 8000
WORKDIR /app
ARG JAR_FILE=./build/libs/uh-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
