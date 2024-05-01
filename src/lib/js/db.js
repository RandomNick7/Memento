import Dexie from 'dexie';

export const db = new Dexie('MementoDB');
db.version(1).stores({
  notes: '++id, pinned'
});