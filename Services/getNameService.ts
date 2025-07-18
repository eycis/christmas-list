export const  fetchName = async () : Promise<{data?: string, message?: string} | null> => {
      try {
        const response = await fetch("/api/fetch-name");
        const data = await response.json();

        if(!response.ok){
            console.error("response while fetching data");
            return {message: data.message}
        }
    
        return {data: data.name};
    
        } catch(error){
            console.error("error while api call", error);
            return null;
        }
    }