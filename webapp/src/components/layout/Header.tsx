import {
    Flex,
    Button,
    Container,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import { IconAsterisk } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import { modals } from "@mantine/modals";
import RegisterModal from "../RegisterModal";

const Header = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    //   const { user, token, login, logout } = useAuth();

    return (
        <Container
            size={"80%"}
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Flex
                gap={"xs"}
                align="center"
                component={UnstyledButton}
                onClick={() => {
                    return navigate("/");
                }}
            >
                <ThemeIcon size={40} radius="xl">
                    <IconAsterisk stroke={4} />
                </ThemeIcon>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily: "Montserrat, sans-serif",
                    }}
                    c={"red"}
                >
                    ReadThot
                </Text>
            </Flex>

            <Flex style={{ gap: "16px" }}>
                {token && user ? (
                    <>
                        <Text>{user || "Anonymous"}</Text>
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => {
                                modals.open({
                                    title: "Authentication | Login",
                                    //   children: <LoginModal />,
                                });
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => {
                                modals.open({
                                    title: "Authentication | Register",
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
