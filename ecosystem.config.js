module.exports = {
    apps: [
        {
            name: "recatch",
            script: "./build/service.js",
            watch: true,
            env: {
                "PORT": 8084,
                "NODE_ENV": "development"
            },
            env_production: {
                "PROXY_HOST": "localhost",
                "PROXY_PORT": 8082,
                "PORT": 8084,
                "NODE_ENV": "production",
            }
        }
    ]
};