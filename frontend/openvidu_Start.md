# docker
```
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0
```

# Java
```
cd openvidu-tutorials/openvidu-basic-java
mvn spring-boot:run

```

# React
```
cd openvidu-tutorials/openvidu-react
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

# library-react
```
cd openvidu-tutorials/openvidu-library-react
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```