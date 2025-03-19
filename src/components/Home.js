import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { green } from '@mui/material/colors';
import Map from './Map';
import SummaryComponent from './SummaryComponent';
import MetadataComponent from './MetadataComponent';
import TreeDistCharts from './TreeDistCharts';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
  },
});

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Home = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="simple tabs example"
          >
            <Tab label="Map" />
            <Tab label="Summary" />
            <Tab label="Metadata" />
            <Tab label="Charts" />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Map />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <SummaryComponent />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <MetadataComponent />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <TreeDistCharts />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
