import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { fetchName } from '@/Services/getNameService';
import { Friend } from '@/models/friend';
import { getFriends } from '@/Services/getFriendsService';


const MainPage = () => {

  const [buttonVisibility, setButtonVisibility] = useState<boolean>(true);
  const [chosenFriend, setChosenFriend] = useState<string | null>(null);
  const [friendsList, setFriendsList] = useState <Friend[]>();
  const [selectedRecipient, setSelectedRecipient] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFriends();
        if (data?.data) {
          setFriendsList(data.data);
        }
        }catch (error) {
          console.error("záznamy nenalezeny");
        }
    };
    fetchData();
  }, []);

  const getRandomFriend = async() => {
    try{
        if (!selectedRecipient) {
          alert("Prosím, vyber své jméno.");
          return;
        }
        const result = await fetchName(selectedRecipient);
      
        if(result?.data){
          console.log(result.data);
          setButtonVisibility(false);
          setChosenFriend(result.data);
        
    }
    }catch(error){
      setChosenFriend(`error: ${error}`)
    }
  }

  return (
    <div className="relative h-screen flex flex-col lg:flex-row overflow-hidden items-center bg-[#f5f0dc]">
      <div className='flex flex-col items-center justify-center text-center h-full w-full lg:w-2/3 px-4'>
      {buttonVisibility && (
        <>
          <select  
              className="bg-transparent border-2 border-[#2e2f29] mb-8 rounded-full px-3 py-2"
              value={selectedRecipient ?? ""}
              onChange={(e) => setSelectedRecipient(e.target.value)}>
              <option value = ""> -- Vyber své jméno -- </option>
              {friendsList?.map((friend, index)=>
              (
                <option key={index} value={friend.email}> {friend.name} </option>
              ))}
              </select>
            <button
              className="text-xl text-[#2e2f29] p-5 font-text font-semibold lg:text-2xl
                hover:bg-[#2e2f29] rounded-full hover:text-white transition-colors duration-500"
                onClick={getRandomFriend}
            >
              Vylosovat kamaráda
            </button>
            </>)
          }

          {chosenFriend && (
            <p className="text-[#2e2f29] text-2xl font-text mt-10">
              Vylosované jméno:{" "}
              <span className="font-bold font-text text-3xl">{chosenFriend}</span>
            </p>
          )}
        </div>

      {/* 🖥 Obrázek vpravo na desktopu */}
      <div className="hidden lg:block lg:w-1/3 relative min-h-screen ">
        <Image
          src="/map.jpg"
          alt="Budapest map"
          fill
          sizes="33vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
};

export default MainPage;
