import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import { deleteRoom, updateRoom } from '@/backend/controllers/roomControllers';
import dbConnect from '@/backend/config/dbconnect';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom);
router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom);

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function DELETE(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
