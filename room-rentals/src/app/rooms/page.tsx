"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import type { Room } from "@/types";
import SortSelect from "@/app/components/SortSelect";
import RoomList from "./components/room-list";
import Pagination from "./components/pagination";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  
  const currentPage = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10));
  const sortParam = searchParams.get("sort") || "createdAt";
  
  const [data, setData] = useState<{ 
    nodes: Room[]; 
    page: { 
      totalPages: number; 
      totalElements: number 
    } 
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const pageIndex = currentPage - 1; 
        const sortValue = sortParam || 'createdAt';
        
        const apiUrl = new URL(`${API_URL}/rooms`);
        apiUrl.searchParams.set('size', '9');
        apiUrl.searchParams.set('page', pageIndex.toString());
        apiUrl.searchParams.set('sort', sortValue);
  
        const response = await fetch(apiUrl.toString(), { next: { revalidate: 60 } });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
  
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage, sortParam]);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading rooms...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        Error: {error}
      </div>
    </div>
  );

  if (!data) return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-gray-500">No room data available</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          Showing {data.nodes.length} of {data.page.totalElements} rooms
        </p>
        
        <SortSelect currentSort={sortParam} />
      </div>

      <RoomList rooms={data.nodes} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={data.page.totalPages} 
        sort={sortParam} 
      />
    </div>
  );
}