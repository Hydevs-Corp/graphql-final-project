import {
    Button,
    Container,
    Flex,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAsterisk } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router';
import { AuthProvider } from '../../providers/AuthProvider';
import parseJwt from '../../scripts/decodeJWT';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const Header = () => {
    const { user, token, logout } = AuthProvider.use();
    const navigate = useNavigate();
    //   const { user, token, login, logout } = useAuth();

    return (
        <Container
            size={'80%'}
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Flex
                gap={'xs'}
                align="center"
                component={UnstyledButton}
                onClick={() => {
                    return navigate('/');
                }}
            >
                <ThemeIcon size={40} radius="xl">
                    <IconAsterisk stroke={4} />
                </ThemeIcon>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily: 'Montserrat, sans-serif',
                    }}
                    variant="gradient"
                    fw={'bold'}
                    gradient={{ from: 'red.4', to: 'red.8' }}
                >
                    ReadThot
                </Text>
            </Flex>

            <Flex style={{ gap: '16px' }}>
                {token ? (
                    <>
                        <Button
                            component={NavLink}
                            to={`/user/${parseJwt(token).id}`}
                            // size="lg"
                            variant="light"
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <Avatar name={user!} color="initials" /> */}
                            {user || 'Anonymous'}
                        </Button>
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => {
                                modals.open({
                                    title: 'Authentication | Login',
                                    children: <LoginModal />,
                                });
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => {
                                modals.open({
                                    title: 'Authentication | Register',
                                    children: <RegisterModal />,
                                });
                            }}
                        >
                            Register
                        </Button>
                    </>
                )}
                {/* <NavLink to={} /> */}
            </Flex>
        </Container>
    );
};

export default Header;
