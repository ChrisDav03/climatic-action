"use server";
import { cookies } from "next/headers";

export async function getHeaders() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    "Content-Type": "application/json",
    Cookie: cookieString, 
  };
}
export async function getActivities() {
    try {
      const headers = await getHeaders();
      const res = await fetch("http://localhost:5000/agronomic-activity", {
        method: "GET", 
        headers,
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("Fetched Plots:", data);
      return data; 
    } catch (error) {
      console.error("Failed to fetch plots:", error);
      throw error; 
    }
  }
  export async function getActivitiesByPlot(plotId: string) {
    try {
      const headers = await getHeaders(); // Ensure this function is implemented correctly
      const res = await fetch(`http://localhost:5000/agronomic-activity/plot/${plotId}`, {
        method: "GET",
        headers,
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("Fetched Activities:", data);
      return data; // Return the fetched activities
    } catch (error) {
      console.error("Failed to fetch Activities:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
export async function createActivity(plotData: any) {
  try {
    const headers = await getHeaders();
    const res = await fetch("http://localhost:5000/agronomic-activity", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(plotData),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Plot Created:", data);
    return data;
  } catch (error) {
    console.error("Failed to create plot:", error);
    throw error;
  }
}
