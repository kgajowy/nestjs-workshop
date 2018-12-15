import { Test, TestingModule } from '@nestjs/testing';
import { Database } from 'sqlite3';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService],
    }).compile();
    service = module.get<DbService>(DbService);
  });

  afterEach(async () => {
    await service.close();
  });

  it('should return db connection Promise', async () => {
    const dbPromsie = service.db;
    expect(dbPromsie).toBeInstanceOf(Promise);
  });
  it('connection promise should resolve to Database instance', async () => {
    const db = await service.db;
    expect(db).toBeInstanceOf(Database);
  });
  it('it should close the connection', async () => {
    await service.close();
    expect(service.dbPromise).toBe(null);
  });

  it('should execute sql command', async () => {
    const resExpected = {
      id: expect.any(Number),
    };
    const res1 = await service.run('CREATE TABLE Log (name TEXT)');
    expect(res1).toMatchObject(resExpected);

    const res2 = await service.run('INSERT INTO log VALUES (?)', ['test mesage']);
    expect(res2).toMatchObject(resExpected);
  });

  it('should return all records from log', async () => {
    await service.run('CREATE TABLE Log (message TEXT)');
    await service.run('INSERT INTO log VALUES (?)', ['msg1']);
    await service.run('INSERT INTO log VALUES (?)', ['msg2']);

    const res = await service.all('SELECT rowid as id, * FROM log');

    expect(res).toMatchObject([
      { id: 1, message: 'msg1' },
      { id: 2, message: 'msg2' },
    ]);
  });
});
