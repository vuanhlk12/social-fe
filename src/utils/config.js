const config = import.meta.env.PROD
  ? {
      URL: "https://social-be-vuanh.herokuapp.com/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
    }
  : {
      URL: "http://localhost:8800/",
      PUBLIC_FOLDER:
        "https://firebasestorage.googleapis.com/v0/b/social-img-17ab9.appspot.com/o/images/",
    };

export default config;
