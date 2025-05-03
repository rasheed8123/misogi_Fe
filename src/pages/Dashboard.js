import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Button,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMyPortfolio, portfolioAnalytics } from '../services/allApis';
import CaseStudyForm from './components/caseStudyForm';
import ThemeSelector from './components/ThemeSelector';
import SnackbarAlert from './components/SnackbarAlert';
import CaseStudyCard from './components/caseStudyCard';
import PublicLayout from './components/backgroundLayout';
import { ThemeContext } from '../context/ThemeContext';
import CaseStudyModal from './components/CaseStudyModel';
import AnalyticsModal from './components/AnalyticsModel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProfileComponent = ({ user }) => (
  <Stack spacing={1}>
    <Typography><strong>User Name:</strong> {user.username}</Typography>
    <Typography><strong>Registered:</strong> {user.createdAt ? user.createdAt.slice(0, 10) : 'Not available'}</Typography>
  </Stack>
);

const ChangePasswordComponent = () => (
  <Box>
    <Typography>Change Password Form Here</Typography>
  </Box>
);

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { themeName, setThemeName } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const navigate = useNavigate();

  const openAnalytics = async () => {
    const res = await portfolioAnalytics();
    setAnalyticsData(res.data);
    setAnalyticsOpen(true);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleMenuClose();
    setOpenProfile(true);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    setOpenChangePassword(true);
  };

  const handleLogout = () => {
    setThemeName('light');
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleEdit = (id) => navigate(`/edit-case-study/${id}`);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleView = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getMyPortfolio();
        setThemeName(data.data.theme);
        setPortfolio(data.data);
      } catch (err) {
        console.error('Failed to fetch portfolio', err);
        setSnackbar({ open: true, message: 'Error loading portfolio', severity: 'error' });
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <PublicLayout>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ProjectShelf – Portfolio Builder for Creatives
          </Typography>
          <ThemeSelector setSnackbar={setSnackbar} />
          <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
            <Avatar>{user.username?.[0].toUpperCase()}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleProfile}>My Profile</MenuItem>
            {/* <MenuItem onClick={handleChangePassword}>Change Password</MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>Welcome, {user.username}</Typography>
          <Typography variant="body1" color="text.secondary">
          As you build your portfolio, remember that you're crafting the first
           impression others will have of your talent. Each case study is a window into
           your creativity, your process, and the value you bring.
           What you showcase here isn’t just content — it's a reflection of your passion and potential.
          </Typography>
        </Paper>

        <Box mt={5} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Your Case Studies</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={openAnalytics}>View Analytics</Button>
            <Button variant="contained" onClick={() => navigate('/dashboard/casestudy/new')}>Add Case Study</Button>
          </Stack>
        </Box>

        <Grid container spacing={3} mt={2}>
          {portfolio?.caseStudies?.map((cs) => (
            <Grid item key={cs._id} xs={12} sm={6} md={4}>
              <CaseStudyCard caseStudy={cs} onView={() => handleView(cs._id)} onEdit={() => handleEdit(cs._id)} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openProfile} onClose={() => setOpenProfile(false)}>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Stack direction="column" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Avatar
            src="https://i.pravatar.cc/150?img=3" // dummy user image
            sx={{
              width: 80,
              height: 80,
              border: '3px solid #1976d2', // primary blue border
            }}
          />
          <Typography variant="h6">👋 Hello, {user.username}!</Typography>
          <ProfileComponent user={user} />
          <Stack direction="row" spacing={1} alignItems="center">
            <VisibilityIcon color="action" />
            <Typography variant="body2"><strong>Profile Views:</strong> {portfolio?.views}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>


      <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <ChangePasswordComponent />
        </DialogContent>
      </Dialog>

      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />

      <CaseStudyModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        caseStudyId={selectedId}
      />

      {analyticsData && (
        <AnalyticsModal
          open={analyticsOpen}
          handleClose={() => setAnalyticsOpen(false)}
          data={analyticsData}
        />
      )}
    </PublicLayout>
  );
}
