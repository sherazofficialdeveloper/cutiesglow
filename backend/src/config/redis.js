// backend/src/config/redis.js

import Redis from 'ioredis';

let redisClient = null;

export const getRedisClient = () => {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      db: parseInt(process.env.REDIS_DB || '0'),
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected');
    });
  }
  return redisClient;
};

/**
 * Set cache with expiration
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds
 */
export const setCache = async (key, value, ttl = 3600) => {
  const client = getRedisClient();
  await client.set(key, JSON.stringify(value), 'EX', ttl);
};

/**
 * Get cache
 * @param {string} key - Cache key
 * @returns {any} Cached value or null
 */
export const getCache = async (key) => {
  const client = getRedisClient();
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

/**
 * Delete cache
 * @param {string} key - Cache key
 */
export const deleteCache = async (key) => {
  const client = getRedisClient();
  await client.del(key);
};

export default {
  getRedisClient,
  setCache,
  getCache,
  deleteCache,
};