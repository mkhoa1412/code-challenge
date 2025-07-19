import sqlite3 from 'sqlite3';
declare class Database {
    private db;
    private static instance;
    private constructor();
    static getInstance(): Database;
    private initializeTables;
    run(query: string, params?: any[]): Promise<sqlite3.RunResult>;
    get(query: string, params?: any[]): Promise<any>;
    all(query: string, params?: any[]): Promise<any[]>;
    close(): Promise<void>;
}
export default Database;
//# sourceMappingURL=connection.d.ts.map