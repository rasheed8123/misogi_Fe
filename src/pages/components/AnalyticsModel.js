import {
  Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts';

export default function AnalyticsModal({ open, handleClose, data }) {
  // Convert viewsByDate object to array for recharts
  const viewsByDateArray = Object.entries(data?.viewsByDate || {}).map(([date, views]) => ({
    date,
    views,
  }));

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Portfolio Analytics
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" mb={2}>
          Total Portfolio Views: {data?.totalViews}
        </Typography>

        <Typography variant="subtitle1">Views per Case Study</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.viewsByCaseStudy}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#3f51b5" />
          </BarChart>
        </ResponsiveContainer>

        <Box mt={4}>
          <Typography variant="subtitle1">Daily Traffic Trend (All Views)</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsByDateArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#ff9800" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>Views by Case Study Over Time</Typography>
        {data?.viewsByCaseStudyDate?.map((cs, index) => {
          const formattedData = Object.entries(cs.viewsByDate).map(([date, views]) => ({
            date,
            views,
          }));

          return (
            <Box key={index} mt={3}>
              <Typography variant="subtitle2" mb={1}>{cs.title}</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
