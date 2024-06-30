import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('667ff0e8003e5c31919a');

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };