import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import { allAdminRooms, newRoom } from '@/backend/controllers/roomControllers';
import dbConnect from '@/backend/config/dbconnect';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminRooms);
router.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRoom);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function POST(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
