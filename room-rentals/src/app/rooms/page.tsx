"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import type { Room } from "@/types";
import SortSelect from "../components/SortSelect";
import RoomList from "./components/room-list";
import Pagination from "./components/pagination";

export const metdata: Metadata = {
  title: "Cabins | Arrrbnb",
  description: "Browse our collection of cozy cabins for your next getaway."
};

export default function RoomsPage() {
  const searchParams = useSearchParams();
  
  const currentPage = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10));
  const pageIndex = currentPage - 1;
  const sort = searchParams.get("sort") || "createdAt,desc";
  const pageSize = 9;

  const [data, setData] = useState<{ nodes: Room[]; page: { totalPages: number; totalElements: number } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/rooms?page=${pageIndex}&size=${pageSize}&sort=${sort}`);

        if (!response.ok) throw new Error("Failed to fetch rooms");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [pageIndex, sort]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading rooms</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {data.page.totalPages} ({data.page.totalElements} results)
        </div>

        <div className="relative">
          <SortSelect currentSort={sort} />
        </div>
      </div>

      <RoomList rooms={data.nodes} />

      <Pagination currentPage={currentPage} totalPages={data.page.totalPages} sort={sort} />
    </>
  );
}
