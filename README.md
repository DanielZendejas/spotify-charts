# Spotify charts
## How to run
### With Docker
```
docker pull danielzendejas/albumcharts
docker run -e REACT_APP_HOST=http://localhost:3000 -p 3000:3000 danielzendejas/albumcharts
```
### Without Docker
Execute `npm run start` and then open http://localhost:3000 in your browser. Be sure to include the following env vars:
```
REACT_APP_HOST=http://localhost:3000
```

