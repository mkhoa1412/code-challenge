import { Box, Container, Grid, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ContentLayoutProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  ContainerLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  ContentLayout__Paper: {
    padding: theme.spacing(3),
  },
}));

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.ContainerLayout}>
      <Container maxWidth="md">
        <Paper className={classes.ContentLayout__Paper} elevation={3}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12} width="100%">
              {children}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
