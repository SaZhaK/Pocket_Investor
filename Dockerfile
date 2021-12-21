FROM maven:3.6-alpine as DEPS

WORKDIR /opt/app

COPY entity/pom.xml entity/pom.xml
COPY domain/pom.xml domain/pom.xml
COPY service/pom.xml service/pom.xml
COPY endpoint/pom.xml endpoint/pom.xml

COPY pom.xml pom.xml

ADD entity/target/entity-1.0.0-SNAPSHOT.jar entity-1.0.0-SNAPSHOT.jar
ADD domain/target/domain-1.0.0-SNAPSHOT.jar domain-1.0.0-SNAPSHOT.jar
ADD service/target/service-1.0.0-SNAPSHOT.jar service-1.0.0-SNAPSHOT.jar
ADD endpoint/target/endpoint-1.0.0-SNAPSHOT.jar endpoint-1.0.0-SNAPSHOT.jar

RUN mvn clean install

EXPOSE 8080

ENTRYPOINT ["java","-jar","endpoint-1.0.0-SNAPSHOT.jar"]