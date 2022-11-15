import React, { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Burger,
  Button,
  Center,
  Stack,
  Title,
  Accordion,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { HomeLinks } from '../Models';
import { faq } from '../Config';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {},
  },
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },
  insideText: {
    display: 'inline-block',
    color: '#228be6',
  },
  headlineDescription: {
    color: 'rgb(51, 65, 85)',
    textAlign: 'center',
    fontSize: '1.125rem',
    maxWidth: '35rem',
    margin: '0 auto',
  },
  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Home({ links }: HomeLinks) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

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
            {items}
            <Button radius="xl" sx={{ height: 30 }}>
              Sign up
            </Button>
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Container>
      </Header>
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
          {faq && faq.length > 0 && (
            <Container size="sm" className={classes.wrapper}>
              <Title align="center" className={classes.title}>
                Frequently Asked Questions
              </Title>
              <Accordion variant="separated">
                {faq &&
                  faq.map(({ key, title, description }) => (
                    <Accordion.Item
                      key={key}
                      className={classes.item}
                      value={key}
                    >
                      <Accordion.Control>{title}</Accordion.Control>
                      <Accordion.Panel>{description}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
              </Accordion>
            </Container>
          )}
        </Stack>
      </Center>
    </>
  );
}
