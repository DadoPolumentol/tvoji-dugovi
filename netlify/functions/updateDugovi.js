import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function handler(event, context) {
  // check login
  if(!context.clientContext?.user) return { statusCode: 401, body: 'Not authorized' };

  const { amount } = JSON.parse(event.body);
  const dataFile = join(process.cwd(), 'netlify/functions/data.json');
  const data = JSON.parse(readFileSync(dataFile));
  
  data.dugovi += Number(amount);
  writeFileSync(dataFile, JSON.stringify(data));
  return { statusCode: 200, body: JSON.stringify(data) };
}
