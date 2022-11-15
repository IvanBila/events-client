import React from 'react';
import {
  Header,
  Container,
  Burger,
  Button,
  Center,
  Stack,
  Title,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { faq } from '../util/Config';
import HomePageAccordion from '../components/HomePageAccordion';
import { useHomePageStyles } from '../util/Styles';

export default function Home() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useHomePageStyles();

  return (
    <>
      <Header sx={{ borderBottom: 0 }} height={60} mb={70}>
        <Container className={classes.header}>
          <Center>
            <svg
              aria-hidden="true"
              viewBox="0 0 271 275"
              width="30"
              height="30"
            >
              <circle
                cx="138"
                cy="139"
                r="132"
                fill="rgb(34, 139, 230)"
              ></circle>
            </svg>
            <span
              style={{
                marginLeft: '10px',
                fontSize: '14pt',
                fontWeight: '700',
              }}
            >
              Wei Events
            </span>
          </Center>
          <Group spacing={5} className={classes.links}>
            <Link className={cx(classes.link)} to="/sign-in">
              Sign in
            </Link>
            <Link to="/sign-up">
              <Button radius="xl" sx={{ height: 30 }}>
                Sign up
              </Button>
            </Link>
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Container>
      </Header>
      <main>
        <Center>
          <Stack>
            <Title size={50}>
              An event manager to{' '}
              <Text className={classes.insideText} size={50}>
                rule them all
              </Text>
            </Title>
            <Text className={classes.headlineDescription}>
              A collection of tools that empower you to create, manage and grow
              your events.
            </Text>
            <Group sx={{ margin: '0 auto' }}>
              <Link to="/create-event">
                <Button
                  radius="xl"
                  sx={{ height: 38, fontFamily: 'Inter, sans-serif' }}
                >
                  Create event
                </Button>
              </Link>

              <Link to="/events">
                <Button
                  leftIcon={<IconChevronRight size={15} />}
                  variant="outline"
                  radius="xl"
                  sx={{ height: 38, fontFamily: 'Inter, sans-serif' }}
                >
                  Explore Events
                </Button>
              </Link>
            </Group>
          </Stack>
        </Center>
      </main>
      <footer>
        {faq && faq.length > 0 && <HomePageAccordion faq={faq} />}
      </footer>
    </>
  );
}
