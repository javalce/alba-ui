import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Page from '@/app/page';

describe('page', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toBeDefined();
  });
});
