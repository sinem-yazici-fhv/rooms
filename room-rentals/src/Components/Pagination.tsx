import { PageInfo } from '@/types';
import Link from 'next/link';

type Props = {
  page: PageInfo;
  currentPage: number;
};

export default function Pagination({ page, currentPage }: Props) {
  return (
    <div>
      <p>Page {currentPage} of {page.totalPages} ({page.totalElements} results in total)</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {/* Previous Link */}
        {currentPage > 1 ? (
          <Link href={`/rooms?page=${currentPage - 1}`} data-testid="previous-link">
            Previous
          </Link>
        ) : (
          <span data-testid="previous-disabled" style={{ color: 'gray' }}>Previous</span>
        )}
        
        {/* Next Link */}
        {currentPage < page.totalPages ? (
          <Link href={`/rooms?page=${currentPage + 1}`} data-testid="next-link">
            Next
          </Link>
        ) : (
          <span data-testid="next-disabled" style={{ color: 'gray' }}>Next</span>
        )}
      </div>
    </div>
  );
}