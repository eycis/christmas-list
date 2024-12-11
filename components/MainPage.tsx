import React, {useState } from 'react'
import { Friend } from "@/models/friend";

interface MainPageProps {
  friends: Friend[];
  onRemoveFriend: (id: string) => void;
}

const MainPage = ({friends, onRemoveFriend}: MainPageProps) => {

  console.log("friends z main:", friends);
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(true);
  const [chosenFriend, setChosenFriend] = useState<Friend | null>(null);


  const pickRandomFriend = () => {
    if (friends.length === 0) {
      alert("Všechna jména již byla vylosována!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * friends.length);
    const selectedFriend = friends[randomIndex];

    setButtonVisibility(false);
    setChosenFriend(selectedFriend);
    onRemoveFriend(String(selectedFriend.id));
    console.log("----------------------------");
    console.log("volá se metoda pro smazání z mainpage", selectedFriend.name, selectedFriend.id);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
            <h1 className='font-title text-center mt-52 text-4xl font-bold lg:text-7xl text-[#f0ece8] '> Vylosuj si jméno pro tajného ježíška </h1>
            {buttonVisibility && (
            <button 
                className='text-4xl bg-[#f0ece8] text-[#67312a] p-5 rounded-lg font-text font-bold mt-20 lg:text-6xl
                hover:bg-[#67312a] hover:text-[#f0ece8] transition-colors  duration-500'
                onClick={pickRandomFriend}
            > 
            Vylosovat kamaráda 
            </button>
          )}

      {chosenFriend && (
        <p className="text-white text-3xl font-title mt-32 px-3">
          Vylosované jméno: {" "} <span className="font-bold font-text text-4xl lg:text-4xl">{chosenFriend.name}</span>
        </p>
      )}

    </div>
  )
}

export default MainPage