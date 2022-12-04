const config = import.meta.env.PROD
  ? {
      URL: "https://web-vuanhlk12.cloud.okteto.net/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
      SOCKET_URL: "wss://socket-vuanhlk12.cloud.okteto.net/",
    }
  : {
      URL: "http://localhost:8800/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
      SOCKET_URL: "ws://localhost:8900",
    };

export default config;
