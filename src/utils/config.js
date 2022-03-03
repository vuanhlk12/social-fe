const config = import.meta.env.PROD
  ? {
      URL: "https://social-be-vuanh.herokuapp.com/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
      SOCKET_URL: "wss://social-socket-vuanh.herokuapp.com",
    }
  : {
      URL: "http://localhost:8800/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
      SOCKET_URL: "ws://localhost:8900",
    };

export default config;
