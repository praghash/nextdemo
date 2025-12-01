"use client"
import React, { useEffect, useState } from "react";

const FetchAPI = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    // Define async arrow function inside useEffect
    const regexName = /ab/gi;
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData(jsonData.filter((item: any) => item.name.match(regexName)));
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{isLoading ? <div>Loading...</div> : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FetchAPI;
