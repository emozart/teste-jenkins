require('dotenv-flow').config({
    silent: true
  });

export const appConfig = {
    timeout: parseInt(process.env.TIMEOUT_REQUEST_SECONDS,10) * 1000,
}