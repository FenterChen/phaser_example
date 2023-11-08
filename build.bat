set version=v0.0.3
docker build -t 34.81.83.64:3100/h5-game/test-client:%version% .
docker push 34.81.83.64:3100/h5-game/test-client:%version%
