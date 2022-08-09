import { useState, useEffect } from 'react';
import API from '../../utils/api';

import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import theme from '../../themes/theme';

const IMG_SIZE = 350;

const App: React.FC = (): JSX.Element => {
  const [bothLoaded, setBothLoaded] = useState<boolean>(false);
  const [beardReady, setBeardReady] = useState<boolean>();
  const [beardSrc, setBeardSrc] = useState<string>();
  const [joke, setJoke] = useState<string>();

  useEffect(() => {
    getBeard();
    getJoke();
  }, []);

  const getBeard = () => {
    setBeardSrc(() => '');
    setBeardReady(false);
    setTimeout(() => {
      setBeardSrc(
        // append a dummy query parameter with Date obj
        // workaround for Firefox caching imgs from same url
        () => `https://placebeard.it/g/350/notag?${new Date().getTime()}`
      );
    }, 100);
  };

  const getJoke = async () => {
    setJoke(() => '');
    const nextJoke = await API.getJoke();
    if (nextJoke) setJoke(nextJoke);
    else setJoke('Could not find a joke!');
  };

  const getBeardJoke = () => {
    setBothLoaded(() => false);
    getBeard();
    getJoke();
  };

  const update = () => {
    setBeardReady(() => true);
    setBothLoaded(() => true);
  };

  return (
    <Container maxWidth='xs'>
      <Stack minHeight={625} maxHeight={800} justifyContent='space-between'>
        <Stack alignItems={'center'}>
          <Box height={350} width={350}>
            {!beardReady && (
              <Box position={'absolute'}>
                <Skeleton variant='rectangular' height={350} width={350} />
              </Box>
            )}
            {beardSrc && (
              <img
                id='image'
                height={350}
                width={350}
                style={
                  beardReady
                    ? { display: 'block', borderRadius: 5 }
                    : { display: 'none' }
                }
                src={beardSrc}
                alt='bearded person courtesy of https://placebeard.it/'
                onLoad={update}
              />
            )}
          </Box>

          <Box
            width={300}
            marginTop={2}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            {bothLoaded && joke ? (
              <Typography color={theme.palette.text.primary}>{joke}</Typography>
            ) : (
              <Box width='100%'>
                <Skeleton variant='text' />
                <Skeleton variant='text' />
                <Skeleton variant='text' />
              </Box>
            )}
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth onClick={() => getBeard()} variant='outlined'>
              new beard
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={() => getJoke()} variant='outlined'>
              new joke
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => getBeardJoke()} variant='outlined'>
              new beard and dad joke
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default App;
