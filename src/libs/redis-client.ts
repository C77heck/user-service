import Redis from "ioredis";

import { CONSTANTS } from './constants';
import { json } from "./helpers";

const { REDIS } = CONSTANTS;
// port: process.env.REDIS_PORT
const redis = new Redis(process.env.REDIS_PORT as any, {
  host: process.env.REDIS_HOST,
  password: '',
});

const get = async (key: string): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const val = await redis.get(key);
    return json(val);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const set = async (key: string, value: string) => {
  try {
    await redis.set(key, value);
  } catch (e) {
    console.log(e);
  }
};

const clear = async (key: string) => {
  try {
    await redis.set(key, null as any);
  } catch (e) {
    console.log(e);
  }
};

const clearAll = async () => {
  try {
    for (const key in REDIS) {
      await clear((REDIS as any)[key]);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.get = get;
exports.set = set;
exports.clear = clear;
exports.clearAll = clearAll;
