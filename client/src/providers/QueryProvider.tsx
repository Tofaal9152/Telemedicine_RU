import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type Props = { children: ReactNode };

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0, // চাইলে 0 করে দিতে পারো (no auto retry)
            refetchOnWindowFocus: false,
            refetchOnReconnect: false, // ✅ net back হলে auto refetch off
            refetchOnMount: false, // ✅ screen mount হলে auto refetch off
            staleTime: 60_000,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
