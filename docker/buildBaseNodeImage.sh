[ -d ./node_modules ] && rm -rf ./node_modules

git checkout . && git pull

npm install

version_tag=$(date +%Y.%m%d.%H%M)

harbor_url=175.24.166.118

docker build -t ${harbor_url}/xulf/base_node_images:${version_tag} -f ./docker/Dockerfile.base_node_images .

docker push ${harbor_url}/xulf/base_node_images:${version_tag}

echo ${harbor_url}/xulf/base_node_images:${version_tag}
