'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import {
  exportMyMoveUsersCsv,
  getMyMoveUserDetail,
  listMyMoveUsers,
} from '@/lib/admin/my-move-users';

export async function listMyMoveUsersAction(input: {
  search?: string;
  sortColumn?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
}) {
  await assertAdminSession();
  return listMyMoveUsers(input);
}

export async function getMyMoveUserDetailAction(userId: string) {
  await assertAdminSession();
  return getMyMoveUserDetail(userId);
}

export async function exportMyMoveUsersCsvAction(input: {
  search?: string;
  sortColumn?: string;
  sortDir?: 'asc' | 'desc';
}) {
  await assertAdminSession();
  return exportMyMoveUsersCsv(input);
}