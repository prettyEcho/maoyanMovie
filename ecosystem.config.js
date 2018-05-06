module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'maoyanMovie',
      script: 'bin/www',
      wactch    :  true,
      env: {
        COMMON_VARIABLE: 'true',
        NODE_PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: 'echo:*'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node', // deploy server user
      host: '**', // deploy server host
      port: "22", // deploy server port
      ref: 'origin/master', // item branch
      repo: '**', // item repo path
      path: '**', // deploy path
      'post-deploy': '. ~/.zshrc && cnpm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
