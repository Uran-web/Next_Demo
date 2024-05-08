import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/backend/config/dbconnect';
import { forgotPassword } from '@/backend/controllers/authControllers';

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(forgotPassword);

export async function POST(request: NextRequest, ctx: RequestContext): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>
}
