export class BaseConnection {

    async connect() {
        throw new Error("Connect method is not implemented");
    }

    async disconnect() {
        throw new Error("Connect method is not implemented");
    }
}