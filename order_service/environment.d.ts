declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      CATALOG_BASE_URL: string;
      DATABASE_URL: string;

      CLIENT_ID: string;
      GROUP_ID: string;
      BROKER_1: string;
    }
  }
}
