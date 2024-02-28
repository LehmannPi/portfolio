import { Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Jump from 'react-reveal/Jump';
import { Link } from 'react-scroll';

import { useTranslation } from 'react-i18next';
import links from '../../data/footerLinks';
import styles from '../../styles/sections/Landing.module.css';
import { colors } from '../../theme';
import LinkIconBar from '../LinkIconBar';
import SectionContainer from '../SectionContainer';

export default function Landing() {
  const primary = useColorModeValue(colors.primary.dark, colors.primary.light);
  const secondary = useColorModeValue(
    colors.secondary.light,
    colors.secondary.dark
  );

  const { t, i18n } = useTranslation();

  const header = (
    <div className={styles.center}>
      <h1 className={styles.tagline} style={{ color: primary }}>
        {t('landing.intro')}{' '}
        <strong style={{ color: secondary }}>{t('landing.job')}</strong>
      </h1>
    </div>
  );

  return (
    <SectionContainer
      id="landing"
      name="landing"
      display="flex"
      justify="center"
      headerText={header}
    >
      <LinkIconBar links={links} />
      {/* <Button
        as={URL}
        colorScheme={secondary}
        variant="ghost"
        size="lg"
        mb="2"
        href="/resume.pdf"
        isExternal
      >
        Download resume
      </Button> */}
      <Link
        activeClass="active"
        to="about"
        spy
        smooth
        offset={-70}
        duration={500}
      >
        <VStack>
          <Text
            as="strong"
            _hover={{ color: secondary, cursor: 'pointer' }}
            className={styles.learn}
          >
            {t('landing.more')}
          </Text>
          <VStack>
            <Jump forever duration={1500}>
              <BsChevronDown />
            </Jump>
          </VStack>
        </VStack>
      </Link>
    </SectionContainer>
  );
}
