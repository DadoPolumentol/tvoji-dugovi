import { readFileSync } from 'fs';
import { join } from 'path';

export async function handler() {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'netlify/functions/data.json')));
  
  // Calculate daily interest since last update
  const lastDate = new Date(data.lastReset);
  const today = new Date();
  const diffDays = Math.floor((today - lastDate) / (1000*60*60*24));
  
  if(diffDays > 0){
    data.dugovi = Math.round(data.dugovi * Math.pow(1 + data.kamatnaStopa/100, diffDays));
    data.lastReset = today.toISOString().split('T')[0];
  }

  return { statusCode: 200, body: JSON.stringify(data) };
}
