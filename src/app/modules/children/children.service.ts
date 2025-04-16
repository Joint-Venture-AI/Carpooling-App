import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import ChildrenCacheManage from "./children.cacheManage";
import { TChildren, TReturnChildren } from "./children.interface";
import { Children } from "./children.model";
import { User } from "../user/user.model";

const createChild = async (child: TChildren): Promise<Partial<TChildren>> => {
  console.log(child);
   //check if parent is exists
   const isParentExists = await User.findById(child.parentId);
  if (!isParentExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parent not found");
  }
  const newChild = await Children.create(child);
  await ChildrenCacheManage.updateChildrenCache(newChild._id.toString());
  return newChild;
};
const getAllChildrens = async (
  query: Record<string, unknown>
): Promise<TReturnChildren.getAllChildren> => {
  const cached = await ChildrenCacheManage.getCacheListWithQuery(query);
  if (cached) return cached;

  const childrenQuery = new QueryBuilder(Children.find(), query)
    .search(["firstName", "lastName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await childrenQuery.modelQuery;
  console.log(result);
  const meta = await childrenQuery.countTotal();

  await ChildrenCacheManage.setCacheListWithQuery(query, { result, meta });

  return { result, meta };
};
const getChildrenById = async (
  id: string
): Promise<Partial<TReturnChildren.getSingleChildren>> => {
  // First, try to retrieve the children from cache.
  const cachedChildren = await ChildrenCacheManage.getCacheSingleChildren(id);
  if (cachedChildren) return cachedChildren;

  // If not cached, query the database using lean with virtuals enabled.
  const children = await Children.findById(id);

  if (!children) {
    throw new AppError(StatusCodes.NOT_FOUND, "Children not found");
  }

  // Cache the freshly retrieved children data.
  await ChildrenCacheManage.setCacheSingleChildren(id, children);
  return children;
};

const getChildrenByParentId = async (
  parentId: string
): Promise<Partial<TReturnChildren.getChildrenByParentId>> => {
  // First, try to retrieve the children from cache.
  const cachedChildren = await ChildrenCacheManage.getCacheChildrenByParentId(
    parentId
  );
  if (cachedChildren) return cachedChildren;

  // If not cached, query the database using lean with virtuals enabled.
  const children = await Children.find({ parentId });

  if (!children) {
    throw new AppError(StatusCodes.NOT_FOUND, "Children not found");
  }

  // Cache the freshly retrieved children data.
  await ChildrenCacheManage.setCacheChildrenByParentId(parentId, children);
  return children;
};

const updateChildren = async (
  id: string,
  updateData: Partial<TReturnChildren.updateChildren>
): Promise<Partial<TReturnChildren.updateChildren>> => {
  const children = await Children.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!children) {
    throw new AppError(StatusCodes.NOT_FOUND, "Children not found");
  }
  //remove cache
  await ChildrenCacheManage.updateChildrenCache(id);
  return children;
};

export const ChildrenServices = {
  createChild,
  getAllChildrens,
  getChildrenById,
  updateChildren,
  getChildrenByParentId,
};
