import Link from "next/link"

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    sort: string
}

export default function Pagination({currentPage, totalPages, sort} : PaginationProps	) {
    return (
        <div className="flex justify-center gap-4 mt-12">
      {/* Only show Previous button if not on first page */}
      {currentPage > 1 ? (
        <Link
          href={`/rooms?page=${currentPage - 1}&sort=${sort}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : (
        // Inactive element that doesn't accept clicks
        <span className="px-4 py-2 border rounded text-gray-400 cursor-not-allowed">Previous</span>
      )}

      <div className="flex gap-2">
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          const page = i + 1
          return (
            <Link
              key={page}
              href={`/rooms?page=${page}&sort=${sort}`}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Only show Next button if not on last page */}
      {currentPage < totalPages ? (
        <Link
          href={`/rooms?page=${currentPage + 1}&sort=${sort}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        // Inactive element that doesn't accept clicks
        <span className="px-4 py-2 border rounded text-gray-400 cursor-not-allowed">Next</span>
      )}
    </div>
  )
}