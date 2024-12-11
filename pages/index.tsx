import React, { useEffect, useState } from "react";
import MainPage from "@/components/MainPage";
import SnowParticles from "@/components/Particles";
import { Friend } from "@/models/friend";

const Index = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    try {
      const response = await fetch("/api/fetchFriends");
      if (!response.ok) {
        throw new Error("Chyba při načítání seznamu přátel.");
      }
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Chyba při načítání přátel:", error);
    }
  };

  const removeFriend = async (id: string) => {
    try {
      const response = await fetch("/api/removeFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: String(id) }),
      });

      if (!response.ok) {
        throw new Error("Chyba při odstraňování přítele.");
      }
  
      const data = await response.json();
      console.log("Aktualizovaný seznam přátel z API:", data.friends);
  
      setFriends(data.friends);
    } catch (error) {
      console.error("Chyba při odstraňování přítele:", error);
    }
  };

  useEffect(() => {
    fetchFriends(); 
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#67312a]">
      <SnowParticles />
      <MainPage friends={friends} onRemoveFriend={removeFriend} />
    </div>
  );
};

export default Index;
