FROM openjdk:17
EXPOSE 8081
ARG JAR_FILE=build/libs
COPY ${JAR_FILE}/uh-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]