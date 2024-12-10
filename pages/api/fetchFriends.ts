import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';


const filePath = path.resolve(process.cwd(), 'public/data.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const friendsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const friends = friendsData.friends;

    res.status(200).json(friends);
  } catch (error) {
    console.error('Chyba při čtení souboru:', error);
    res.status(500).json({ message: 'Chyba serveru při čtení seznamu přátel.' });
  }
}
