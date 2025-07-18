export const  fetchName = async (email: string) : Promise<{data?: string, message?: string} | null> => {

      try {
        const response = await fetch("/api/fetch-name", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({email}),
        });
        
        const data = await response.json();

        if(!response.ok){
            console.error("response while fetching data");
            return {message: data.message}
        }

        return {data: data.data, message: data?.message || ""};
    
        } catch(error){
            console.error("error while api call", error);
            return null;
        }
    }