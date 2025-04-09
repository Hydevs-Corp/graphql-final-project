import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { AuthProvider } from '../providers/AuthProvider';

const LoginModal = () => {
    const { login, state } = AuthProvider.use();
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            termsOfService: false,
        },

        validate: {
            password: (value) =>
                value.length >= 8
                    ? null
                    : 'Password must be at least 8 characters',
        },
    });

    return (
        <form
            onSubmit={form.onSubmit(async (values) => {
                const { username, password } = values;
                const res = await login(username, password);
                if (!res?.errors) {
                    modals.closeAll();
                }
            })}
        >
            <TextInput
                withAsterisk
                label="Username"
                placeholder="D4rkKnight"
                key={form.key('username')}
                {...form.getInputProps('username')}
                autoComplete="username"
            />
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="mySup3rP4ssw0rd"
                key={form.key('password')}
                type="password"
                {...form.getInputProps('password')}
                autoComplete="password"
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={state.loading}>
                    Submit
                </Button>
            </Group>
            {state.error && (
                <div style={{ color: 'red', marginTop: '1rem' }}>
                    Username or password incorrect
                </div>
            )}
        </form>
    );
};

export default LoginModal;
