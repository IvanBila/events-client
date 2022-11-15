import {
  TextInput,
  Container,
  Stack,
  Textarea,
  Button,
  Text,
  Title,
  Center,
  Box,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons';
import { BASE_URL } from '../Config';
import { FormBody } from '../Models';
import { useCreateEventStyles } from '../Styles';

export default function CreateEvent() {
  const { classes } = useCreateEventStyles();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const createEvent = async (formData: FormBody) => {
    try {
      setIsLoading(true);
      const result = await fetch(`${BASE_URL}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const response = await result.json();
      if (response.code === 201) {
        navigate('/events');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container sx={{ margin: '40px' }}>
      <Link to="/">
        <Center inline sx={{ textDecoration: 'none', color: 'black' }}>
          <IconArrowLeft size={12} stroke={1.5} />
          <Box ml={5}>Return to landing page</Box>
        </Center>
      </Link>
      <Title align="left">Create event</Title>
      <Text color="dimmed" size="sm" align="left" mb={40}>
        Fill in the form bellow to create the event
      </Text>
      <form onSubmit={form.onSubmit((values) => createEvent(values))}>
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
            loading={isLoading}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
