require('dotenv-flow').config({
    silent: true
  });

export const healthConfig = {
    nodeDockerPort: process.env.NODE_DOCKER_PORT,
    nodeDockerHost: process.env.NODE_DOCKER_HOST,
}