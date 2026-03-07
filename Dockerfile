# Minimal Cheese Crab image (target <200MB). Alpine-based.
FROM alpine:3.19 AS builder
RUN apk add --no-cache build-base cmake git
WORKDIR /src
COPY . .
RUN mkdir build && cd build && cmake .. -DCMAKE_BUILD_TYPE=Release && cmake --build . -j

FROM alpine:3.19
RUN apk add --no-cache libstdc++
COPY --from=builder /src/build/bin/cheese-server /usr/local/bin/
COPY --from=builder /src/build/bin/cheese-cli /usr/local/bin/
EXPOSE 8080
ENTRYPOINT ["cheese-server"]
