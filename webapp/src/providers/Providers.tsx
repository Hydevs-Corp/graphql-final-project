import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { AppShell, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Outlet } from 'react-router';
import Header from '../components/layout/Header';
import theme from '../scripts/theme';
import { AuthProvider } from './AuthProvider';

import { setContext } from '@apollo/client/link/context';
import BackgroundProvider from './BackgroundProvider';
import { FlyProvider } from './FlyProvider';
import { VFXProvider } from 'react-vfx';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const Providers = () => {
    return (
        <VFXProvider>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <MantineProvider theme={theme}>
                        <FlyProvider>
                            <ModalsProvider>
                                <AppShell header={{ height: 60 }}>
                                    <AppShell.Header>
                                        <Header />
                                    </AppShell.Header>
                                    <AppShell.Main>
                                        <BackgroundProvider>
                                            <Outlet />
                                        </BackgroundProvider>
                                    </AppShell.Main>
                                </AppShell>
                            </ModalsProvider>
                            <Notifications />
                        </FlyProvider>
                    </MantineProvider>
                </AuthProvider>
            </ApolloProvider>
        </VFXProvider>
    );
};

export default Providers;
