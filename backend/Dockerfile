# -------- Stage 1: Build --------
# This downloads Java 17 and Maven, then builds your project
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy your pom.xml first (for caching dependencies)
COPY pom.xml .

# Download all dependencies (this gets cached for faster rebuilds)
RUN mvn dependency:go-offline -B

# Copy your source code
COPY src ./src

# Build the project (skip tests to save time)
RUN mvn clean package -DskipTests

# -------- Stage 2: Run --------
# This is a smaller image just to run the app
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the built jar file from Stage 1
COPY --from=build /app/target/job-tracker-backend-1.0.0.jar app.jar

# Tell Render which port your app uses
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]