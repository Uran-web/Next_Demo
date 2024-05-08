import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import { getRoomBookedDates } from '@/backend/controllers/bookingControllers';
import dbConnect from '@/backend/config/dbconnect';

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
