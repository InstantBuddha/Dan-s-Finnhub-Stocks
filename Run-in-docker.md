# Run in Docker

## Run in a Docker container

Use the following command:

```bash
docker run -it --rm --name dan-s-finnhub-stocks -p 3000:3000 -v $(pwd):/$(basename $(pwd)) -w /$(basename $(pwd)) node:21-alpine sh -c "npm install && npm start"
```
The container needs to be manually removed after use.

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