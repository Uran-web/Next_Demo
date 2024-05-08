import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import { allAdminUsers } from '@/backend/controllers/authControllers';
import dbConnect from '@/backend/config/dbconnect';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminUsers);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
