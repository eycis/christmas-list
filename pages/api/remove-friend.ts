import express, { Request, Response } from 'express';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path'; 

const app = express();

app.use(express.json());

const filePath = path.resolve(process.cwd(), 'public/data.json'); 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id }: { id: number } = req.body; 

  try {
    
    const friendsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let friends = friendsData.friends;

    friends = friends.filter((friend: any) => friend.id !== id);

    friendsData.friends = friends;
    fs.writeFileSync(filePath, JSON.stringify(friendsData, null, 2), 'utf-8'); // write = uložení změn do json souboru.

    res.status(200).json({message: "Friend removed", friends});

    res.status(200).json({ message: 'Friend removed', friends });
      } catch (error) {
        console.error('Chyba při aktualizaci souboru:', error); 
        res.status(500).json({ message: 'Chyba serveru při aktualizaci seznamu přátel.' });
      }
      } else {
        res.status(405).json({ error: 'Method not allowed' }); 
      }
  }
