import React from "react";
import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandApple,
  IconBrandWindows,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: string) => {
    // Redirect to standard Spring Security OAuth2 authorization endpoint
    window.location.href = `/oauth2/authorization/${provider}`;
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "var(--mantine-color-body)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 opacity-10 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500 opacity-10 blur-[100px]" />

      <Container size="xs" w="100%" className="relative z-10">
        <Paper
          radius="md"
          p="xl"
          withBorder
          shadow="xl"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "var(--mantine-color-body)",
            borderColor: "var(--mantine-color-default-border)",
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo.svg"
              alt="Lumina PDF Logo"
              className="h-12 w-auto mb-4"
            />
            <Title order={2} ta="center" className="font-bold">
              {t("signup.title", "Create an account")}
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt="xs">
              {t("signup.subtitle", "Get started with Lumina PDF today")}
            </Text>
          </div>

          <Group grow mb="md" mt="md">
            <Button
              variant="default"
              radius="md"
              onClick={() => handleOAuthLogin("google")}
              leftSection={<IconBrandGoogle size={18} />}
              className="transition-transform hover:-translate-y-0.5"
            >
              Google
            </Button>
            <Button
              variant="default"
              radius="md"
              onClick={() => handleOAuthLogin("github")}
              leftSection={<IconBrandGithub size={18} />}
              className="transition-transform hover:-translate-y-0.5"
            >
              GitHub
            </Button>
          </Group>

          <Group grow mb="md">
            <Button
              variant="default"
              radius="md"
              onClick={() => handleOAuthLogin("apple")}
              leftSection={<IconBrandApple size={18} />}
              className="transition-transform hover:-translate-y-0.5"
            >
              Apple
            </Button>
            <Button
              variant="default"
              radius="md"
              onClick={() => handleOAuthLogin("azure")}
              leftSection={<IconBrandWindows size={18} />}
              className="transition-transform hover:-translate-y-0.5"
            >
              Microsoft
            </Button>
          </Group>

          <Divider
            label={t("signup.or", "or continue with email")}
            labelPosition="center"
            my="lg"
          />

          {/* Standard registration form - pointing to backend register endpoint if it exists */}
          <form action="/api/v1/auth/register" method="POST">
            <Stack>
              <TextInput
                required
                label={t("signup.username", "Username")}
                placeholder="johndoe"
                id="username"
                name="username"
                radius="md"
                size="md"
              />

              <TextInput
                required
                label={t("signup.email", "Email")}
                placeholder="hello@lumina-pdf.com"
                id="email"
                name="email"
                type="email"
                radius="md"
                size="md"
              />

              <PasswordInput
                required
                label={t("signup.password", "Password")}
                placeholder={t("signup.password", "Password")}
                id="password"
                name="password"
                radius="md"
                size="md"
              />
            </Stack>

            <Group justify="center" mt="xl">
              <Text size="sm" c="dimmed">
                {t("signup.alreadyHaveAccount", "Already have an account?")}
              </Text>
              <Anchor
                component="button"
                type="button"
                c="blue"
                size="sm"
                className="hover:underline font-semibold"
                onClick={() => navigate("/login")}
              >
                {t("login.title", "Sign in")}
              </Anchor>
            </Group>

            <Button
              type="submit"
              fullWidth
              mt="xl"
              radius="md"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              {t("signup.signUp", "Create account")}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
