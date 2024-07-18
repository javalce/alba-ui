import { ProviderStack } from '@/lib/provider-stack';

import { ThemeProvider } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProviderStack
      providers={[
        [
          ThemeProvider,
          {
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
            disableTransitionOnChange: true,
          },
        ],
      ]}
    >
      {children}
    </ProviderStack>
  );
}
