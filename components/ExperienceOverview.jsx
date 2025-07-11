import {
  Button,
  Flex,
  Heading,
  Link,
  ListItem,
  Select,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { colors } from '../theme';

const ExperienceSelect = ({ expIndex, setIndex, jobs }) => (
  <Select value={expIndex} onChange={(e) => setIndex(e.target.value)}>
    {jobs.map((job, index) => (
      <option key={`${job.workplace}-select-option`} value={index}>
        {job.workplace}
      </option>
    ))}
  </Select>
);

const ExperienceButtons = ({ expIndex, setIndex, jobs }) => (
  <Container style={{ padding: '0px' }}>
    <Grid container spacing={2} justifyContent="center">
      {jobs.map((job, index) => (
        <Grid container item key={`${job.workplaceBtn}-btn`}>
          <Button
            isActive={expIndex === index}
            isFullWidth
            flexWrap="wrap"
            onClick={() => setIndex(index)}
          >
            {job.workplaceBtn}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Container>
);

const ExperienceDetails = ({ index, jobs }) => {
  const job = jobs[index];
  const secondary = useColorModeValue(
    colors.secondary.light,
    colors.secondary.dark
  );
  return (
    <Container maxWidth="680px" style={{ padding: 0 }}>
      <Grid
        container
        direction="column"
        style={{
          margin: 'auto',
          padding: { base: '8px', sm: '12px' },
        }}
      >
        <Grid item>
          <Heading as="h1" size="md" textAlign={{ base: 'center', sm: 'left' }}>
            {job.position} @{' '}
            <Link href={job.url} isExternal color={secondary}>
              {job.workplace}
            </Link>
          </Heading>
        </Grid>
        <Grid item textAlign={{ base: 'center', sm: 'left' }}>
          {job.duration.map((duration) => (
            <Text key={duration} mt={2}>
              {duration}
            </Text>
          ))}
        </Grid>
        <Container maxWidth="680px">
          <Grid
            item
            style={{
              textAlign: { base: 'left', sm: 'justify' },
              paddingX: { base: '4px', sm: '0' },
            }}
          >
            <UnorderedList mt={2}>
              {job.description.map((desc) => (
                <ListItem key={desc} style={{ wordBreak: 'break-word' }}>
                  {desc}
                </ListItem>
              ))}
            </UnorderedList>
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
};

export default function ExperienceOverview() {
  const [index, setIndex] = useState(0);
  const showSelect = useBreakpointValue({
    md: false,
    lg: true,
  });
  const bg = useColorModeValue(colors.bg.light, colors.bg.dark);

  const { t } = useTranslation();

  const jobs = t('jobs', { returnObjects: true });

  const borderConfig = () => {
    if (!showSelect) return null;
    if (bg === colors.bg.light)
      return {
        border: '1px solid',
        borderColor: 'gray.200',
      };
    return {
      border: '2px solid',
      borderColor: 'gray.700',
    };
  };

  return (
    <Container
      style={{
        padding: 0,
        // maxWidth: { sm: '70%', md: '900px' },
        margin: 'auto',
      }}
    >
      <Flex
        as={Grid}
        container
        item
        direction={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems={{ base: 'center', md: 'flex-start' }}
        xs={12}
        sm={11}
        md={10}
        borderRadius="lg"
        {...borderConfig()}
        rounded="md"
        spacing={8}
        style={{
          margin: 'auto',
          width: '100%',
        }}
      >
        <Grid
          container
          direction="column"
          item
          xs={12}
          sm={12}
          md={4}
          alignItems="center"
          justifyContent="flex-start"
        >
          {showSelect ? (
            <ExperienceButtons
              expIndex={index}
              setIndex={setIndex}
              jobs={jobs}
            />
          ) : (
            <ExperienceSelect
              expIndex={index}
              setIndex={setIndex}
              jobs={jobs}
            />
          )}
        </Grid>
        <Grid container item xs={12} sm={12} md={8} maxWidth="680px">
          <ExperienceDetails index={index} jobs={jobs} />
        </Grid>
      </Flex>
    </Container>
  );
}
