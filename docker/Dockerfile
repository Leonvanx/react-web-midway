# syntax=docker/dockerfile:1
# From只包含node_modules和node环境的基础镜像
FROM 175.24.166.118/xulf/base_node_images:2022.0901.1447
# 设置工作目录
WORKDIR /project/react-web-midway
# 软件接
RUN ln -s /project/node_modules /project/react-web-midway/node_modules
# 暴露端口
EXPOSE 30000
# COPY代码
COPY . .

RUN chown xulf /project/react-web-midway/docker/docker-entrypoint.sh

# ENTRYPOINT ["/project/react-web-midway/docker/docker-entrypoint.sh" ]

