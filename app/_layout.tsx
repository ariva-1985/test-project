import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScreenLayout from '@/components/UI/ScreenLayout';
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScreenLayout>
        <Slot />
      </ScreenLayout>
    </QueryClientProvider>
  );
}
