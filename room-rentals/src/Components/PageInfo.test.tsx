import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('zeigt Seiteninformationen an', () => {
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
    
    expect(screen.getByText('Page 1 of 3 (20 results in total)')).toBeDefined();
  });

  it('zeigt aktive Previous/Next Links an', () => {
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
    
    expect(screen.getByTestId('previous-link')).toBeDefined();
    expect(screen.getByTestId('next-link')).toBeDefined();
  });

  it('deaktiviert Previous auf der ersten Seite', () => {
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
    
    expect(screen.getByTestId('previous-disabled')).toBeDefined();
    expect(screen.getByTestId('previous-disabled')).toHaveProperty('style.color', 'gray');
  });
});