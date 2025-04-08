import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

const RegisterModal = () => {
  //   const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8 ? null : "Password must be at least 8 characters",
      termsOfService: (value) =>
        value ? null : "You must sell your soul to use our services",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        modals.closeAll();
      })}
    >
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="mySup3rP4ssw0rd"
        key={form.key("email")}
        type="password"
        {...form.getInputProps("password")}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key("termsOfService")}
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default RegisterModal;
