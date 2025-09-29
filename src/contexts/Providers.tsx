"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "./ConfigContext";

const queryClient = new QueryClient();

export const Providers = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <ConfigProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </ConfigProvider>
}