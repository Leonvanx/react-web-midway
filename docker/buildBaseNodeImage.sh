[ -d ./node_modules ] && rm -rf ./node_modules

git checkout . && git pull

npm install

version_tag=$(date +%Y.%m%d.%H%M)

docker build -t 175.24.166.118/xulf/base_node_images:${version_tag} -f ./docker/Dockerfile.base_node_images .

docker push 175.24.166.118/xulf/base_node_images:${version_tag}

echo 175.24.166.118/react-web-midway/base_node_images:${version_tag}
