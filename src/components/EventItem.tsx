import { ActionIcon, Center, Group, Menu, Text } from '@mantine/core';
import React from 'react';
import { EventItemProps } from '../Models';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { useEventStyles } from '../util/Styles';

export default function EventItem({ event, remove, edit }: EventItemProps) {
  const { classes } = useEventStyles();
  return (
    <>
      <Center key={event.id}>
        <Group position="apart" className={classes.item} noWrap spacing="xl">
          <>
            <Text>{event.title}</Text>
            <Text size="xs" color="dimmed">
              {event.description}
            </Text>
          </>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => edit(event)}
                icon={<IconPencil size={16} stroke={1.5} />}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => remove(event)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Center>
    </>
  );
}
