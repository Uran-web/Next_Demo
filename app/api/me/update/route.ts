import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/backend/config/dbconnect';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import { updateProfile } from '@/backend/controllers/authControllers';

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(updateProfile);

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
