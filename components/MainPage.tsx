import React, { useEffect, useState } from 'react'
import data from "@/public/data.json";
import {friend} from "@/models/friend";
import { response } from 'express';

const MainPage = () => {
  const [friends, setFriends] = useState<typeof friend[]>([]); //pro načtení dat friend s jsonu
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(true);

  const fetchFriends = async () => {
    try {
      const response = await fetch('/api/fetchFriends');
      const data = await response.json(); 
      setFriends(data); 
    } catch (error) {
      console.error('Chyba při načítání přátel:', error);
    }
  };

  const pickRandomFriend = async () => {

    if (friends.length === 0) {
      alert('Všechna jména již byla vylosována!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * friends.length);
    const chosenFriend = friends[randomIndex];

    setSelectedFriend(chosenFriend.name);
    setButtonVisibility(false);

    try {
      const response = await fetch('/api/remove-friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: chosenFriend.id }),
      });

      const data = await response.json();
      setFriends(data.friends);
    } catch (error) {
      console.error('Chyba při odstraňování přítele:', error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []); 


  return (
    <div className='flex flex-col items-center justify-center'>
            <h1 className='font-title text-center mt-32 text-6xl text-[#f0ece8]'> Vylosuj si jméno pro tajného ježíška </h1>
            {buttonVisibility && (
            <button 
                className='text-4xl bg-[#f0ece8] text-[#67312a] p-5 rounded-lg font-text font-bold mt-20
                hover:bg-[#67312a] hover:text-[#f0ece8] transition-colors  duration-500'
                onClick={pickRandomFriend}
            > 
            Vylosovat kamaráda 
            </button>
          )}
            {selectedFriend && (
        <p className="text-white text-4xl font-title mt-32">
          Vylosované jméno: <span className="font-bold font-text text-5xl">{selectedFriend}</span>
        </p>
      )}
    </div>
  )
}

export default MainPage