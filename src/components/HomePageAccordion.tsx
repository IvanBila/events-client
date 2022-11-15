import { Accordion, Container, Title } from '@mantine/core';
import React from 'react';
import { useHomePageAccordionStyles } from '../Styles';
import { Faq } from '../Models';

export default function HomePageAccordion({ faq }: { faq: Faq[] }) {
  const { classes } = useHomePageAccordionStyles();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>
      <Accordion variant="separated">
        {faq &&
          faq.map(({ key, title, description }) => (
            <Accordion.Item key={key} className={classes.item} value={key}>
              <Accordion.Control>{title}</Accordion.Control>
              <Accordion.Panel>{description}</Accordion.Panel>
            </Accordion.Item>
          ))}
      </Accordion>
    </Container>
  );
}
