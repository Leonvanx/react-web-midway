# syntax=docker/dockerfile:1
# From只包含node_modules和node环境的基础镜像
FROM 175.24.166.118/xulf/base_node_images:1.0
# 设置工作目录
WORKDIR /project/react-web-midway
# 软件接
RUN ln -s /project/node_modules /project/react-web-midway/node_modules
# 暴露端口
EXPOSE 3000
# COPY代码
COPY . .

RUN chmod +x /project/react-web-midway/docker/docker-entrypoint.sh

ENTRYPOINT ["/bin/bash","/project/react-web-midway/docker/docker-entrypoint.sh" ]

