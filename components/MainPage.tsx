import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchName } from '@/Services/getNameService';
import { Friend } from '@/models/friend';
import { getFriends } from '@/Services/getFriendsService';

const MainPage = () => {
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(true);
  const [chosenFriend, setChosenFriend] = useState<string | null>(null);
  const [friendsList, setFriendsList] = useState<Friend[]>();
  const [selectedRecipient, setSelectedRecipient] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFriends();
        if (data?.data) {
          setFriendsList(data.data);
        }
      } catch (error) {
        console.error('záznamy nenalezeny');
      }
    };
    fetchData();
  }, []);

  const getRandomFriend = async () => {
    try {
      if (!selectedRecipient) {
        alert('Prosím, vyber své jméno.');
        return;
      }
      const result = await fetchName(selectedRecipient);

      if (result?.data) {
        console.log(result.data);
        setButtonVisibility(false);
        setChosenFriend(result.data);
      }
    } catch (error) {
      setChosenFriend(`error: ${error}`);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <Image
        src="/phone.jpeg"
        alt="background"
        fill
        priority
        className="object-cover object-center z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl w-full">
        {buttonVisibility && (
          <>
            <p className="text-center animate-fade-in mb-4 font-text text-lg lg:text-xl text-[#2e2f29]">
              Kdo vybírá kamaráda?
            </p>
            <select
              className="bg-transparent text-center border-2 animate-fade-in border-[#2e2f29] text-[#2e2f29] mb-6 rounded-full px-4 py-2 font-text"
              value={selectedRecipient ?? ''}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value=""> -- Vyber své jméno -- </option>
              {friendsList?.map((friend, index) => (
                <option key={index} value={friend.email}>
                  {friend.name}
                </option>
              ))}
            </select>
            <button
              className="text-lg text-[#f24b96] tracking-wide bg-[#2e2f29] animate-fade-in px-6 py-3 font-text font-semibold lg:text-2xl rounded-full transition-colors duration-500 hover:bg-[#f24b96] hover:text-white"
              onClick={getRandomFriend}
            >
              Vylosovat kamaráda
            </button>
          </>
        )}

        {chosenFriend && (
          <p className="text-[#2e2f29] text-2xl font-text mt-10">
            Vylosované jméno: 
            <span className="font-bold text-3xl mx-3 uppercase">{chosenFriend}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
