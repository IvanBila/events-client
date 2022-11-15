import React, { useState, useEffect } from 'react';
import { Calendar, DatePicker } from '@mantine/dates';
import { IconPencil, IconTrash, IconDots } from '@tabler/icons';
import {
  Indicator,
  Title,
  Drawer,
  useMantineTheme,
  Text,
  Center,
  ActionIcon,
  Notification,
  Container,
  Modal,
  Group,
  Menu,
  Stack,
  TextInput,
  Textarea,
  Button,
} from '@mantine/core';
import { DateTime } from 'luxon';
import { BASE_URL } from '../util/Config';
import { Event, FormBody, HashedEvents } from '../Models';
import { useForm } from '@mantine/form';
import { useEventStyles } from '../util/Styles';
import EventItem from '../components/EventItem';

export default function Events() {
  const [value, setValue] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [hashedEvents, setHashedEvents] = useState<HashedEvents>({});
  const [removing, setRemoving] = useState(false);
  const { classes } = useEventStyles();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    validate: {
      title: (value) => {
        if (!value) return 'Title is required';
      },
      description: (value) => {
        if (!value) return 'Description is required';
      },
      startDate: (value) => {
        if (!value) return 'Start date is required';
      },
      endDate: (value) => {
        if (!value) return 'End date is required';
        if (value < form.values.startDate)
          return 'End date cannot be before start date';
      },
    },
  });

  const remove = async (event: Event) => {
    setRemoving(true);
    try {
      const result = await fetch(`${BASE_URL}/event/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await result.json();
      if (response.code === 200) {
        setEvents(events.filter((e) => e.id !== event.id));
        hashedEvents[event.start.getDate()] = hashedEvents[
          event.start.getDate()
        ].filter((e) => e.id !== event.id);
      }
    } finally {
      setRemoving(false);
    }
  };

  const edit = async (event: Event) => {
    form.setValues(event);
    setIsModalOpened(true);
    setOpened(false);
  };

  const updateEvent = async (formData: FormBody) => {
    try {
      setLoading(true);
      const result = await fetch(`${BASE_URL}/event`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const response = await result.json();
    } finally {
      setLoading(false);
      setIsModalOpened(false);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/events`)
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
      <Modal
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title="Update Event"
      >
        <form onSubmit={form.onSubmit((values) => updateEvent(values))}>
          <Stack>
            <Text sx={{ fontSize: '14pt', fontWeight: 'bold' }}>
              Event Details
            </Text>

            <TextInput
              label="Title"
              placeholder="JavaScript Web Performance"
              classNames={classes}
              size="md"
              {...form.getInputProps('title')}
            />

            <Textarea
              label="Description"
              placeholder="Minimizing app size using modern technologies"
              classNames={classes}
              size="md"
              {...form.getInputProps('description')}
            />
            <DatePicker
              label="Start date"
              placeholder="When will you leave?"
              classNames={classes}
              inputFormat="DD/MM/YYYY"
              allowFreeInput
              size="md"
              {...form.getInputProps('startDate')}
            />
            <DatePicker
              label="End date"
              placeholder="When will you leave?"
              classNames={classes}
              inputFormat="DD/MM/YYYY"
              allowFreeInput
              size="md"
              {...form.getInputProps('endDate')}
            />
            <Button
              type="submit"
              sx={{ maxWidth: '130px' }}
              size="md"
              loading={loading}
            >
              Update
            </Button>
          </Stack>
        </form>
      </Modal>
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
        {removing && (
          <Notification loading title="Removing event">
            Please wait until data is removed.
          </Notification>
        )}
        <Container>
          <Title align="center" order={3} mb={15}>
            Events on this day
          </Title>
          <div>
            {(value == null ||
              value?.getDate() == null ||
              hashedEvents == null ||
              hashedEvents[value?.getDate()].length == 0) && (
              <Title align="center" order={5} mb={15}>
                No events found
              </Title>
            )}
            {
              //@ts-ignore
              hashedEvents[value?.getDate()]?.map((event) => (
                <EventItem
                  remove={remove}
                  edit={edit}
                  event={event}
                  key={event.id}
                />
              ))
            }
          </div>
        </Container>
      </Drawer>
      <Calendar
        value={value}
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
