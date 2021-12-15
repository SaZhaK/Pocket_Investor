FROM maven:3.6-alpine as DEPS

WORKDIR /pocket_investor
COPY domain/pom.xml domain/pom.xml
COPY endpoint/pom.xml endpoint/pom.xml
COPY entity/pom.xml entity/pom.xml
COPY service/pom.xml service/pom.xml

COPY pom.xml .

RUN mvn clean install

EXPOSE 8080

CMD mvn spring-boot:run