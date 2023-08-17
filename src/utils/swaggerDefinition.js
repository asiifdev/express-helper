import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Service User",
      version: "3.0.0",
      description: "Set your description here"
    },
    externalDocs: {
      description: "swagger.json",
      url: "/api/v1/paywetalk/swagger.json"
    },
  },
  apis: ["./src/docs/swagger.json"]
}

const specs = swaggerJSDoc(options)

export { options, specs }