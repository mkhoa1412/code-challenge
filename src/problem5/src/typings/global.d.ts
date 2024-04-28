declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOST: string;
      PORT: string;
      DB_TYPE: 'sqlite' | 'mysql';
      DB_FILE: string;
    }
  }
}

export {}
