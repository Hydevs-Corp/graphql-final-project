import { AuthProvider } from "./AuthProvider";
import { AppShell, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Outlet } from "react-router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "../components/layout/Header";
import theme from "../scripts/theme";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Providers = () => {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <ApolloProvider client={client}>
          <AuthProvider>
            <AppShell header={{ height: 60 }}>
              <AppShell.Header>
                <Header />
              </AppShell.Header>
              <AppShell.Main>
                <Outlet />
              </AppShell.Main>
            </AppShell>
          </AuthProvider>
        </ApolloProvider>
      </ModalsProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default Providers;

{
  /* <MantineProvider theme={theme}>
<ModalsProvider>
    <AuthProvider>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <RouterProvider router={router} />
        </AppShell.Main>
      </AppShell>
    </AuthProvider>
  </ApolloProvider>
</ModalsProvider>
<Notifications />
</MantineProvider> */
}
