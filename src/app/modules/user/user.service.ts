import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import UserCacheManage from "./user.cacheManage";
import { TReturnGetAllUsers, TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: TUser): Promise<TUser> => {
  const newUser = await User.create(user);
  await UserCacheManage.updateUserCache(newUser._id.toString());
  return newUser;
};
const getAllUsers = async (
  query: Record<string, unknown>
): Promise<TReturnGetAllUsers> => {
  const cached = await UserCacheManage.getCacheListWithQuery(query);
  if (cached) return cached;

  const userQuery = new QueryBuilder(User.find(), query)
    .search(["firstName", "lastName", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  await UserCacheManage.setCacheListWithQuery(query, { result, meta });

  return { result, meta };
};

const getUserById = async (id: string): Promise<Partial<TUser>> => {
  const cachedUser = await UserCacheManage.getCacheSingleUser(id);
  if (cachedUser) return cachedUser;
  if (cachedUser) return cachedUser;
  const user = await User.findById(id).lean();
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  UserCacheManage.setCacheSingleUser(id, user);
  return user;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
};
