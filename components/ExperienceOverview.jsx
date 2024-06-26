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
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
// import jobs from '../data/jobs';
import { useTranslation } from 'react-i18next';

import styles from '../styles/components/ExperienceOverview.module.css';
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
  <Grid
    container
    item
    spacing={2}
    justifyContent="center"
    style={{ margin: 'auto' }}
  >
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
);

const ExperienceDetails = ({ index, jobs }) => {
  const job = jobs[index];
  const secondary = useColorModeValue(
    colors.secondary.light,
    colors.secondary.dark
  );
  return (
    <Grid container item direction="column">
      <Grid container item style={{ margin: '12px' }}>
        <Heading as="h1" size="md">
          {job.position} @{' '}
          <Link href={job.url} isExternal color={secondary}>
            {job.workplace}
          </Link>
        </Heading>
      </Grid>
      <Grid container item style={{ marginLeft: '12px' }}>
        {job.duration.map((duration) => (
          <Grid key={duration} container item>
            <Text mt={2}>{duration}</Text>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        item
        className={styles.grid_exp}
        style={{
          marginLeft: '12px',
          // marginBottom: "12px",
          textAlign: 'justify',
        }}
      >
        <UnorderedList mt={2}>
          {job.description.map((desc) => (
            <ListItem key={desc}>{desc}</ListItem>
          ))}
        </UnorderedList>
      </Grid>
    </Grid>
  );
};

export default function ExperienceOverview() {
  const [index, setIndex] = useState(0);
  const showSelect = useBreakpointValue({
    base: false,
    lg: true,
  });
  const bg = useColorModeValue(colors.bg.light, colors.bg.dark);

  const { t } = useTranslation();

  const jobs = t('jobs', { returnObjects: true });

  return (
    <Flex
      as={Grid}
      container
      item
      direction="row"
      justifyContent="center"
      xs={10}
      sm={9}
      md={8}
      borderRadius="lg"
      borderWidth={bg === colors.bg.light ? '1px' : ''}
      rounded="md"
      style={{
        margin: '24px',
        marginTop: '3vh',
        height: '60vh',
      }}
    >
      <Grid
        container
        direction="column"
        item
        xs={9}
        sm={6}
        md={3}
        alignItems="center"
        justifyContent="flex-start"
        style={{ marginTop: '24px', marginBottom: '24px', marginRight: '3vw' }}
      >
        {showSelect ? (
          <ExperienceButtons expIndex={index} setIndex={setIndex} jobs={jobs} />
        ) : (
          <ExperienceSelect expIndex={index} setIndex={setIndex} jobs={jobs} />
        )}
      </Grid>
      <Grid
        container
        item
        xs={9}
        sm={6}
        style={{
          marginTop: '24px',
          marginBottom: '24px',
          marginLeft: '12px',
          paddingBottom: '12px',
        }}
      >
        <ExperienceDetails index={index} jobs={jobs} />
      </Grid>
    </Flex>
  );
}
