# syntax=docker/dockerfile:1
# From只包含node_modules和node环境的基础镜像
FROM 175.24.166.118/react-web-midway/base_node_images:1.0
# 设置工作目录
WORKDIR /project/react-web-midway
# 软件接
RUN ln -s /project/node_modules /project/react-web-midway/node_modules
# 暴露端口
EXPOSE 30000
# COPY打包好的代码
COPY ./dist ./dist
# 拷贝入口脚本
COPY ./docker/docker-enttypoint.sh ./docker-enttypoint.sh
# ENTRYPOINT [ "./docker-enttypoint.sh" ]

