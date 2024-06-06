'use server'
import { promises as fs } from 'fs';

export default async function read_file() {
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
    const data = JSON.parse(file);
  
    return data
  }
