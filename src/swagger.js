const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./src/swagger_output.json";
const endPointsFiles = ["src/routes/index.js"];

const doc = {
    swagger: "3.0",
    info: {
        version: "1.0.0",
        title: "Soul Doações",
        description: "API para integração entre ONGs e doadores",
    },
    host: "localhost:3333",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json", "application/xml"],
    produces: ["application/json"],
    tags: [
        {
            name: "ONGs",
            description: "EndPoint para ONGs",
        },
        {
            name: "Doador",
            description: "EndPoint para ONGs",
        },
        {
            name: "Doação",
            description: "EndPoint para ONGs",
        },
        {
            name: "Voluntário",
            description: "EndPoint para ONGs",
        },
    ],
};

swaggerAutogen(outputFile, endPointsFiles, doc);
