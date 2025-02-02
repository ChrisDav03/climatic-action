"use server";
import { cookies } from "next/headers";

export async function getHeaders() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; "); // Manually formatting cookies

  return {
    "Content-Type": "application/json",
    Cookie: cookieString, // Correctly formatted cookies
  };
}
export async function getPlots() {
    try {
      const headers = await getHeaders();
      const res = await fetch("http://localhost:5000/plots", {
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
  
export async function createPlot(plotData: any) {
  try {
    const headers = await getHeaders();
    const res = await fetch("http://localhost:5000/plots", {
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
