import { databases } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
    {
        dbId: '6680463f0025c96aaf8e',
        id: '66804650002239a2bf24',
        name: 'movies',
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),
        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;