import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // custom theme context
import axios from 'axios';
import {
  Typography, Box, CircularProgress, Container, Divider, Chip, Stack, Button, Grid, 
} from '@mui/material';
import { getPortfolioByUsername } from '../services/allApis';
import PublicCaseStudyCard from './components/publicCaseStudyCard';
import PublicLayout from './components/backgroundLayout';
import CaseStudyModal from './components/CaseStudyModelPublic';

export default function PublicPortfolio() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await getPortfolioByUsername(username)
        console.log("data",data)
        setThemeName(data.portfolio.theme)
        setPortfolio(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  const handleView = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!portfolio) return <Container sx={{ mt: 10, textAlign: 'center' }}>
  <Typography variant="h2" color="error" gutterBottom>
    404
  </Typography>
  <Typography variant="h5" gutterBottom>
    Oops! The page you're looking for doesn't exist.
  </Typography>
  <Typography variant="body1" sx={{ mb: 4 }}>
    It might have been moved or deleted.
  </Typography>
  </Container>;

  const { user, caseStudies } = portfolio.portfolio;

  return (
    <PublicLayout>
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3">Welcome to {portfolio.user.username}'s Portfolio</Typography>
      <Typography variant="subtitle1" color="text.secondary">a showcase of creativity, strategy, and execution. 
        Dive into thoughtfully crafted case studies that bring real-world impact to life. Explore the work, 
        the process, and the passion behind every project.
        Whether you're here for inspiration or collaboration, you're in for something special.</Typography>

      <Divider sx={{ my: 3 }} />

      {/* {caseStudies.map((cs, index) => (
        <Box key={index} sx={{ mb: 5 }}>
          <Typography variant="h5">{cs.title}</Typography>
          <Typography sx={{ mb: 2 }}>{cs.overview}</Typography>

          <Typography variant="subtitle2">Tools Used:</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {cs.tools.map((tool, i) => <Chip key={i} label={tool} />)}
          </Stack>

          <Typography variant="subtitle2">Media:</Typography>
          <Stack spacing={1} sx={{ mb: 1 }}>
            {cs.media.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            ))}
          </Stack>

          <Typography variant="subtitle2">Timeline:</Typography>
          {cs.timeline.map((entry, i) => (
            <Box key={i} sx={{ ml: 2 }}>
              <Typography><b>{entry.phase}</b> — {entry.date}</Typography>
              <Typography variant="body2" color="text.secondary">{entry.description}</Typography>
            </Box>
          ))}

          <Typography variant="subtitle2" mt={2}>Outcomes:</Typography>
          <Typography><b>Metrics:</b> {cs.outcomes.metrics}</Typography>
          <Typography><b>Testimonials:</b> {cs.outcomes.testimonials}</Typography>

          <Divider sx={{ mt: 3 }} />
        </Box>
      ))} */}
            <Container sx={{ mt: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">{portfolio?.user.username} Case Studies</Typography>
              </Box>
      
              <Grid container spacing={2} sx={{mt:2}}>
                {portfolio?.portfolio?.caseStudies?.map((cs) => (
                  <Grid item key={cs._id} xs={12} sm={6} md={4}>
                    <PublicCaseStudyCard caseStudy={cs} onView={() => handleView(cs._id)}/>
                  </Grid>
                ))}
              </Grid>
            </Container>
    </Container>
    <CaseStudyModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            caseStudyId={selectedId}
          />
    </PublicLayout>
  );
}
