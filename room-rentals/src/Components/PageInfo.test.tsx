import { it, describe, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('shows page info', () => {
    render(
      <Pagination
        page={{
          number: 0,
          size: 9,
          totalElements: 20,
          totalPages: 3
        }}
        currentPage={1}
      />
    );
    
    screen.getByText('Page 1 of 3 (20 results in total)');
  });

  it('has working previous and next buttons', () => {
    render(
      <Pagination
        page={{
          number: 1,
          size: 9,
          totalElements: 20,
          totalPages: 3
        }}
        currentPage={2}
      />
    );
    
    screen.getByText('Previous');
    screen.getByText('Next');
  });

  it('disables previous on first page', () => {
    render(
      <Pagination
        page={{
          number: 0,
          size: 9,
          totalElements: 20,
          totalPages: 3
        }}
        currentPage={1}
      />
    );
    
    const prev = screen.getByText('Previous');
    expect(prev).not.toHaveAttribute('href');
  });
});