const config = import.meta.env.PROD
  ? { PUBLIC_FOLDER: "http://localhost:8800/images/" }
  : { PUBLIC_FOLDER: "http://localhost:8800/images/" };

export default config;
