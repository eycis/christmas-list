import { Friend } from "@/models/friend";

export const getFriends= async () : Promise<{data?: Friend[], message?: string} | null> => {
    try {
      const response = await fetch("/api/fetch-friends");
      const data = await response.json();

      if(!response.ok){
          console.error("response while fetching data");
          return {message: data.message}
      }
      return {data: data.data || null};
  
      } catch(error){
          console.error("error while api call", error);
          return null;
      }
  }