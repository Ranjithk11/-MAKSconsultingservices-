declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
  }

  export interface StatementSync {
    run(...params: SQLInputValue[]): {
      changes: number | bigint;
      lastInsertRowid: number | bigint;
    };
    all(...params: SQLInputValue[]): Record<string, SQLInputValue>[];
    get(...params: SQLInputValue[]): Record<string, SQLInputValue> | undefined;
  }

  export type SQLInputValue = string | number | bigint | null | Uint8Array;
}
