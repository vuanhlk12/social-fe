const config = import.meta.env.PROD
  ? {
      URL: "https://social-be-vuanhlk12.vercel.app/",
      PUBLIC_FOLDER: "https://social-be-vuanhlk12.vercel.app/images/",
    }
  : {
      URL: "http://localhost:8800/",
      PUBLIC_FOLDER: "http://localhost:8800/images/",
    };

export default config;
