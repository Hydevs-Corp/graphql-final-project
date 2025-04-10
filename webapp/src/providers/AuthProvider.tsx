import { FetchResult, useMutation } from '@apollo/client';
import { createContext, ReactNode, useContext, useState } from 'react';
import parseJwt from '../scripts/decodeJWT';
import loginUser_MUTATE from '../scripts/requests/loginUser';
import registerUser_MUTATE from '../scripts/requests/registerUser';
import { CreateUserMutation, LoginMutation } from '../gql/graphql';
import { GraphQLError } from 'graphql';

// Définir le contexte d'authentification
interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (
        username: string,
        password: string
    ) => Promise<FetchResult<LoginMutation> | void>;
    register: (
        username: string,
        password: string
    ) => Promise<FetchResult<CreateUserMutation> | void>;
    logout: () => Promise<void>;
    state: {
        error: string | null;
        loading: boolean;
    };
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => {
        console.log('Login function not implemented');
        return {} as FetchResult<CreateUserMutation>;
    },
    register: async () => {
        console.log('Register function not implemented');
        return {} as FetchResult<CreateUserMutation>;
    },
    logout: async () => {},
    state: {
        error: null,
        loading: false,
    },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [loginMutate, { error: loginError, loading: loginLoading }] =
        useMutation(loginUser_MUTATE);
    const login = async (
        username: string,
        password: string
    ): Promise<FetchResult<LoginMutation> | void> => {
        try {
            const res = await loginMutate({
                variables: { username, password },
            });

            const tokenJWT = res?.data?.login;
            if (!tokenJWT) {
                return {
                    errors: [new GraphQLError('Invalid username or password')],
                };
            }
            setToken(tokenJWT);
            setUser(parseJwt(tokenJWT).username);
            localStorage.setItem('token', tokenJWT);
            return res;
        } catch (error) {
            console.error('Login failed:', error);
            return {
                errors: [new GraphQLError('Invalid username or password')],
            };
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const [registerMutate, { error: registerError, loading: registerLoading }] =
        useMutation(registerUser_MUTATE);
    const register = async (username: string, password: string) => {
        try {
            const res = await registerMutate({
                variables: { username, password },
            });

            setUser(res?.data?.createUser?.username || '');
            setToken(res?.data?.login || '');
            localStorage.setItem('token', res?.data?.login || '');
            return res;
        } catch (error) {
            return {
                errors: [new GraphQLError('Invalid username or password')],
            };
        }
    };

    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
        setToken(storedToken);
        setUser(parseJwt(storedToken).username);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                register,
                login,
                logout,
                state: {
                    error:
                        loginError?.message || registerError?.message || null,
                    loading: registerLoading || loginLoading,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    // if (!context) {
    //   throw new Error('useAuth must be used within an AuthProvider');
    // }
    return context;
};

AuthProvider.use = useAuth;
