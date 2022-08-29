git checkout . && git pull

npm run build

version_tag = `date +%Y.%m%d.%H.%M`

docker build -t project/react-web-midway:${version_tag} -f /project/react-web-midway/docker/Dockerfile .
