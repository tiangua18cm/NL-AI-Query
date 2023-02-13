
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const vm2_1 = require("vm2");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * ANCHOR: AIQuery
 * AIQuery is a class that simplifies the process of interacting with a MongoDB database
 * by allowing users to make advanced queries using natural language text. It utilizes
 * the OpenAI GPT-4 model to generate executable TypeScript code based on the given query,
 * roles, schemas, and database type, allowing for flexible and dynamic database interactions.
 *
 * The class requires an API key for OpenAI, a connected MongoClient instance, a set of JSON schemas, a list of allowed roles,
 * a database type, and any additional logic to be provided upon instantiation. The main functionality
 * is provided through the `processQuery` method, which takes a natural language query
 * as input and returns the result of the database operation.
 *
 * The process involves creating a detailed and specific prompt for GPT-4 based on the
 * input query, schemas, roles, database type, and additional logic. The AI model then generates
 * a TypeScript code snippet that performs the desired database operation using the provided
 * schemas and connection. The generated code is validated and executed using either eval or vm2,
 * and the result is returned to the user.
 *
 * AIQuery provides a powerful and flexible solution for performing complex database
 * operations using natural language queries while ensuring that role-based access
 * controls are respected.
 * @param apiKey - The API key for OpenAI
 * @param client - A connected MongoClient instance
 * @param schemas - A JSON object containing the schemas for the database
 * @param roles - A list of allowed roles
 * @param apiModel - The API model for OpenAI (default: "text-davinci-003")
 * @param dbName - The name of the database (default: "default")
 * @param additionalLogic - Any additional logic to be provided to the AI model (default: "None")
 * @example const query = new AIQuery(apiKey, client, schemas, ["admin", "user"], "mongodb", "default", "None");
 */
class AIQuery {
    constructor(apiKey, client, schemas, roles, apiModel = "text-davinci-003", dbName = "default", additionalLogic = "None") {
        this.openai = new openai_1.OpenAIApi(new openai_1.Configuration({ apiKey }));
        this.client = client;
        this.schemas = schemas;
        this.roles = roles;
        this.apiModel = apiModel;
        this.dbName = dbName;
        this.additionalLogic = additionalLogic;
    }
    // NOTE: This function processes the query and returns the results.
    processQuery(query, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // ANCHOR: Create prompt for OpenAI GPT-4
            const prompt = `As an AI expert, write a TypeScript code snippet to process a database query based on the following requirements:

- Use MongoDB with Mongoose (already imported)