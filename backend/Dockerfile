FROM openjdk:17
EXPOSE 8081
ARG JAR_FILE=build/libs
COPY ${JAR_FILE}/*.jar ${JAR_FILE}/app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]