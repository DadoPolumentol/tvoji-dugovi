import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function handler(event, context) {
  if(!context.clientContext?.user) return { statusCode: 401, body: 'Not authorized' };

  const dataFile = join(process.cwd(), 'netlify/functions/data.json');
  const data = JSON.parse(readFileSync(dataFile));

  data.dugovi = 0;
  data.lastReset = new Date().toISOString().split('T')[0];
  writeFileSync(dataFile, JSON.stringify(data));

  return { statusCode: 200, body: JSON.stringify(data) };
}
