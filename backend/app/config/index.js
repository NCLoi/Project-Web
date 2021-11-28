const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: "mongodb://localhost:27017/GI"
    },
    jwt: {
        secret: "GI-secret-key"
    }
};

module.exports = config;