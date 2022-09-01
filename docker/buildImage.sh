# 拉取最新代码
git checkout . && git pull
# 打包代码
npm run build
# harbor地址
harbor_url=175.24.166.118
# 镜像tag版本
version_tag=$(date +%Y.%m%d.%H%M)
# 制作镜像
docker build -t ${harbor_url}/react-web-midway/business_images/:${version_tag} -f ./docker/Dockerfile .

