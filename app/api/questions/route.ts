import { getData } from '../../../lib/db';

export async function GET() {
  const data = await getData();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}