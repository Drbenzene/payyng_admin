"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState, useEffect } from "react";

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  // const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  // // Initialize queryClient only once in the client-side
  // useEffect(() => {
  //   setQueryClient(new QueryClient());
  // }, []);

  const isBrowser = typeof window !== "undefined";
  const persister: any = isBrowser
    ? createSyncStoragePersister({
        storage: window.localStorage,
      })
    : null;

  if (!queryClient) {
    return <>{children}</>; // Fallback to rendering children until queryClient is initialized
  }

  return (
    <QueryClientProvider
      client={queryClient}
      // persistOptions={{ persister }}
    >
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
