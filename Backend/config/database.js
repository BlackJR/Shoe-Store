const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST' ),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL') && {
          key: env('DATABASE_SSL_KEY',),
          cert: env('DATABASE_SSL_CERT'),
          ca: env('DATABASE_SSL_CA'),
          capath: env('DATABASE_SSL_CAPATH'),
          cipher: env('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED'
          ),
        },
        schema: env('DATABASE_SCHEMA'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN'), max: env.int('DATABASE_POOL_MAX') },
    }
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
    },
  };
};
