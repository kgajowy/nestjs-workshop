import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';

@Injectable()
export class DbService {
  private dbPath = ':memory:';

  dbPromise: Promise<Database>;

  public get db(): Promise<Database> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const db = new Database(this.dbPath, err => {
          if (err) {
            reject(err);
          } else {
            resolve(db);
          }
        });
      });
    }
    return this.dbPromise;
  }

  public close(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      db.close((err) => {
        if (err) {
          return reject(err);
        } else {
          this.dbPromise = null;
          return resolve(true);
        }
      });
    });
  }

  async run(sql: string, params: any[] = []): Promise<{ id: any }> {
    const db = await this.db;
    return new Promise<{ id: any }>((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  async all<T>(sql, params = []): Promise<T[]> {
    const db = await this.db;
    return new Promise<T[]>((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
