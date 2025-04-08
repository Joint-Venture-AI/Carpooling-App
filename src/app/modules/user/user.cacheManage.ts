import { get } from "mongoose";
import cacheService from "../../../util/cacheService";
import { normalizeQuery } from "../../../util/normalizeQuery";
import { TUser } from "./user.interface";

const DEFAULT_TTL = 60 * 60 * 12; // 12 hours

const UserCacheManage = {
  keys: {
    userList: "userList",
    userListWithQuery: "userListWithQuery",
    userId: (id: string) => `user:${id}`,
    userListWithQueryKey: (query: Record<string, unknown>) => {
      const normalized = normalizeQuery(query);
      return `${UserCacheManage.keys.userListWithQuery}:${JSON.stringify(
        normalized
      )}`;
    },
  },

  updateUserCache: async (userId: string) => {
    const keysToDelete = [
      UserCacheManage.keys.userList,
      UserCacheManage.keys.userListWithQuery,
      UserCacheManage.keys.userId(userId),
    ];
    for (const key of keysToDelete) {
      await cacheService.deleteCache(key);
    }
  },
  getCacheSingleUser: async (userId: string): Promise<TUser | null> => {
    const key = UserCacheManage.keys.userId(userId);
    const cached = await cacheService.getCache<TUser>(key);

    if (cached) {
      return cached;
    }
    return null;
  },
  setCacheSingleUser: async (userId: string, data: Partial<TUser>) => {
    const key = UserCacheManage.keys.userId(userId);
    await cacheService.setCache(key, data, DEFAULT_TTL);
  },
  setCacheListWithQuery: async (
    query: Record<string, unknown>,
    data: { result: any; meta?: any },
    ttl: number = DEFAULT_TTL
  ) => {
    const key = UserCacheManage.keys.userListWithQueryKey(query);
    await cacheService.setCache(key, data, ttl);
  },

  getCacheListWithQuery: async (
    query: Record<string, unknown>
  ): Promise<{ result: any; meta?: any } | null> => {
    const key = UserCacheManage.keys.userListWithQueryKey(query);
    const cached = await cacheService.getCache<{ result: any; meta?: any }>(
      key
    );
    return cached ?? null;
  },
};

export default UserCacheManage;
