export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ok: true, stage: 'stage-1-foundation'});
}
