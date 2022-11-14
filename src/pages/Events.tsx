import { useState, useEffect } from 'react';
//@ts-ignore
import { Calendar } from '@mantine/dates';
import { IconPencil, IconTrash, IconDots } from '@tabler/icons';
import {
  Indicator,
  Title,
  Drawer,
  useMantineTheme,
  Text,
  Center,
  ActionIcon,
} from '@mantine/core';
import { DateTime } from 'luxon';
import { createStyles, Group, Menu } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },

  title: {
    lineHeight: 1,
  },
}));

interface Event {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

interface HashedEvents {
  [key: string]: Event[];
}

export default function Events() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [hashedEvents, setHashedEvents] = useState<HashedEvents>({});
  const { classes } = useStyles();

  const remove = () => {};

  const edit = () => {};

  useEffect(() => {
    fetch('http://localhost:8080/events')
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          const events: Event[] = response.data.map((event: Event) => {
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
            };
          });
          setEvents(events);
        }
      });
  }, []);

  return (
    <>
      <Drawer
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        position="right"
        onClose={() => {
          setOpened(false);
        }}
        opened={opened}
      >
        <>
          <Title align="center" order={3} mb={15}>
            Events on this day
          </Title>
          <div>
            {
              //@ts-ignore
              hashedEvents[value?.getDate()].map((event) => (
                <Center key={event.id}>
                  <Group
                    position="apart"
                    className={classes.item}
                    noWrap
                    spacing="xl"
                  >
                    <div>
                      <Text>{event.title}</Text>
                      <Text size="xs" color="dimmed">
                        {event.description}
                      </Text>
                    </div>
                    <Menu transition="pop" withArrow position="bottom-end">
                      <Menu.Target>
                        <ActionIcon>
                          <IconDots size={16} stroke={1.5} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={edit}
                          icon={<IconPencil size={16} stroke={1.5} />}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconTrash size={16} stroke={1.5} />}
                          color="red"
                          onClick={remove}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Center>
              ))
            }
          </div>
        </>
      </Drawer>
      <Calendar
        value={value}
        onMonthChange={(date) => {}}
        onChange={(value: Date) => {
          setValue(value);
          setOpened(true);
        }}
        fullWidth
        size="xl"
        //@ts-ignore
        styles={(theme) => ({
          cell: {
            border: `1px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          },
          day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
          weekday: { fontSize: theme.fontSizes.lg },
          weekdayCell: {
            fontSize: theme.fontSizes.xl,
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
            border: `1px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
            height: 50,
          },
        })}
        renderDay={(date: Date) => {
          const day = date.getDate();
          const eventsHappeningToday = events.filter((event) => {
            return (
              DateTime.fromJSDate(event.start).toISODate() ===
              DateTime.fromJSDate(date).toISODate()
            );
          });
          hashedEvents[`${day}`] = eventsHappeningToday;
          return (
            <Indicator
              size={8}
              color="red"
              offset={8}
              disabled={!(eventsHappeningToday.length > 0)}
            >
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
    </>
  );
}
