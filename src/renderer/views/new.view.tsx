import { Autocomplete, Box, Button, Chip, Grid, Paper, Stack, Tab, Tabs, TextField, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';

interface TabPanelProps {
  children?: React.ReactNode;
  dangerouslySetInnerHTML?: { __html: string }
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, dangerouslySetInnerHTML, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ flexGrow: 1, height: '100%' }}
      {...other}
    >
      {value === index && (
        dangerouslySetInnerHTML ? <Box sx={{ pt: 1, height: '94%', overflow: 'auto' }} dangerouslySetInnerHTML={dangerouslySetInnerHTML} /> : <Box sx={{ pt: 1, height: '100%' }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const NewView = () => {
  const [title, setTitle] = useState('');
  const [reportedTo, setReportedTo] = useState<string[]>([]);
  const [report, setReport] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  }
  const theme = useTheme();
  const useStyle = makeStyles({
    textarea: {
      height: '100% !important',
      overflow: 'auto !important',
    }
  });
  const classes = useStyle();
  return (
    <form onSubmit={handleOnSubmit} style={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}>
      <Grid container spacing={2} p={2} direction='column' sx={{ height: '100%' }}>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label={t('inputs.title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={reportedTo}
              onChange={(__, values) => setReportedTo(values)}
              multiple
              freeSolo
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('inputs.reportedTo')}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item sx={{ flexGrow: 1, height: '80%' }}>
          <Paper elevation={3} sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={selectedTab} onChange={(__, value) => setSelectedTab(value)}>
                <Tab label='Edit' {...a11yProps(0)} />
                <Tab label='Preview' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel index={0} value={selectedTab}>
              <TextField
                value={report}
                onChange={e => setReport(e.currentTarget.value)}
                multiline
                fullWidth
                sx={{ height: '100%' }}
                InputProps={{
                  sx: { height: '100%' },
                  classes: {
                    input: classes.textarea
                  }
                }}
              />
            </TabPanel>
            <TabPanel index={1} value={selectedTab} dangerouslySetInnerHTML={{ __html: marked(report, { sanitize: true }) }} />
          </Paper>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Button sx={{ maxWidth: 150 }} variant='contained'>First</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
