import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import { getRoomDetails } from '@/backend/controllers/roomControllers';
import dbConnect from '@/backend/config/dbconnect';

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomDetails);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
