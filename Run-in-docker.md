# Run in Docker

## Run in a Docker container

You need to create a valid .env with an API key. Unfortunately websockets might not work with a free private API key:

```bash
docker run -it --rm --name dan-s-finnhub-stocks -p 3000:3000 \
  -v $(pwd):/$(basename $(pwd)) \
  -w /$(basename $(pwd)) \
  --env-file .env \
  node:21-alpine sh -c "npm install && npm start"
```

## To sh in

Run:
```bash
docker exec -it dan-s-finnhub-stocks sh
```

## Handling package updates

With the npm-check-updates:

```sh
npx npm-check-updates
```

then update package.json

```sh
npx npm-check-updates -u
```

and then

```sh
npm install
```