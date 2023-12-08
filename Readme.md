# NL-AI-Query

NL-AI-Query is a powerful TypeScript library that simplifies the process of interacting with a MongoDB database by allowing users to make advanced queries using natural language text. It utilizes the OpenAI GPT-3 model by default to generate executable TypeScript code based on the given query, roles, schemas, and database type, allowing for flexible and dynamic database interactions.

## Features

- Perform complex database operations using natural language queries
- Role-based access control for secure and controlled database interactions
- Utilizes OpenAI GPT-3 model by default for code generation
- Supports MongoDB with Mongoose
- Easily extensible for different databases and AI models in the future

## Installation

```bash
npm install NL-AI-Query
```

## Usage

```typescript
import { MongoClient } from 'mongodb'
import AIQuery from 'NL-AI-Query'

// Connect to your MongoDB instance
const client = new MongoClient('mongodb://localhost:27017/default')
await client.connect()

// Define your schemas and roles
const schemas = {
  users: {
    name: String,
    age: Number
  }
}

const roles = ['admin', 'user']

/* Instantiate AIQuery
 * @param apiKey - The API key for OpenAI
 * @param client - A connected MongoClient instance
 * @param schemas - A JSON object containing the schemas for the database
 * @param roles - A list of allowed roles
 * @param apiModel - The API model for OpenAI (default: "text-davinci-003")
 * @param dbName - The name of the database (default: "default")
 * @param additionalLogic - Any additional logic to be provided to the AI 