import {
  Box, Button, TextField, Typography, Grid, Chip,
  Stack, Paper, Divider, Card
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SnackbarAlert from './SnackbarAlert';
import { createCaseStudy, updateCaseStudy, getCaseStudyById } from '../../services/allApis';

export default function CaseStudyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    media: [],
    mediaInput: '',
    tools: [],
    toolsInput: '',
    outcomes: {
      metrics: '',
      testimonials: ''
    },
    timeline: [],
    timelinePhase: '',
    timelineDesc: '',
    timelineDate: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode) {
      getCaseStudyById(id)
        .then(res => setFormData(res.data))
        .catch(err => console.error('Failed to fetch case study', err));
    }
  }, [editMode, id]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    if (!formData.title || !formData.overview) {
      showSnackbar('Title and overview are required.', 'error');
      return false;
    }

    const isValidURL = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };

    if (formData.media.some(url => !isValidURL(url))) {
      showSnackbar('Please enter valid media URLs.', 'error');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('outcomes.')) {
      setFormData({
        ...formData,
        outcomes: {
          ...formData.outcomes,
          [name.split('.')[1]]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddToArray = (key) => {
    if (key === 'media' && formData.mediaInput) {
      setFormData(prev => ({
        ...prev,
        media: [...prev.media, prev.mediaInput.trim()],
        mediaInput: ''
      }));
    }

    if (key === 'tools' && formData.toolsInput) {
      setFormData(prev => ({
        ...prev,
        tools: [...prev.tools, prev.toolsInput.trim()],
        toolsInput: ''
      }));
    }

    if (key === 'timeline' && formData.timelinePhase && formData.timelineDesc && formData.timelineDate) {
      setFormData(prev => ({
        ...prev,
        timeline: [...prev.timeline, {
          phase: prev.timelinePhase,
          description: prev.timelineDesc,
          date: prev.timelineDate
        }],
        timelinePhase: '',
        timelineDesc: '',
        timelineDate: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (formData.mediaInput) formData.media.push(formData.mediaInput.trim());
    if (formData.toolsInput) formData.tools.push(formData.toolsInput.trim());
    if (formData.timelinePhase && formData.timelineDesc && formData.timelineDate) {
      formData.timeline.push({
        phase: formData.timelinePhase,
        description: formData.timelineDesc,
        date: formData.timelineDate
      });
    }

    if (!validateForm()) return;
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        overview: formData.overview,
        media: formData.media,
        tools: formData.tools,
        timeline: formData.timeline,
        outcomes: formData.outcomes
      };

      if (id) {
        await updateCaseStudy(id, payload);
        showSnackbar('Case Study Updated!');
      } else {
        await createCaseStudy(payload);
        showSnackbar('Case Study Created!');
      }

      setFormData({
        title: '', overview: '', media: [], mediaInput: '',
        tools: [], toolsInput: '',
        outcomes: { metrics: '', testimonials: '' },
        timeline: [], timelinePhase: '', timelineDesc: '', timelineDate: ''
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to submit case study', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={4} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {editMode ? 'Edit Case Study' : 'Create Case Study'}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth multiline rows={4} label="Overview" name="overview" value={formData.overview} onChange={handleChange} sx={{ mb: 4 }} />

      <Typography variant="h6">Media</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1, mb: 2 }}>
        <TextField fullWidth label="Add Media URL" value={formData.mediaInput} onChange={(e) => setFormData({ ...formData, mediaInput: e.target.value })} />
        <Button variant="outlined" onClick={() => handleAddToArray('media')}>Add</Button>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
        {formData.media.map((m, i) => (
          <Chip key={i} label={m} onDelete={() => {
            setFormData(prev => ({ ...prev, media: prev.media.filter((_, index) => index !== i) }));
          }} />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Timeline</Typography>
      <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
        <Grid item xs={4}>
          <TextField fullWidth label="Phase" value={formData.timelinePhase} onChange={(e) => setFormData({ ...formData, timelinePhase: e.target.value })} />
        </Grid>
        <Grid item xs={5}>
          <TextField fullWidth label="Description" value={formData.timelineDesc} onChange={(e) => setFormData({ ...formData, timelineDesc: e.target.value })} />
        </Grid>
        <Grid item xs={3}>
          <TextField type="date" fullWidth value={formData.timelineDate} onChange={(e) => setFormData({ ...formData, timelineDate: e.target.value })} />
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={() => handleAddToArray('timeline')} sx={{ mb: 2 }}>Add Timeline Entry</Button>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {formData.timeline.map((entry, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, position: 'relative' }}>
            <Typography fontWeight="bold">{entry.phase} – {entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Button
              size="small"
              variant="text"
              color="error"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  timeline: prev.timeline.filter((_, i) => i !== index)
                }));
              }}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              Delete
            </Button>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Tools</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1, mb: 2 }}>
        <TextField fullWidth label="Add Tool" value={formData.toolsInput} onChange={(e) => setFormData({ ...formData, toolsInput: e.target.value })} />
        <Button variant="outlined" onClick={() => handleAddToArray('tools')}>Add</Button>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
        {formData.tools.map((t, i) => (
          <Chip key={i} label={t} onDelete={() => {
            setFormData(prev => ({ ...prev, tools: prev.tools.filter((_, index) => index !== i) }));
          }} />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Outcomes</Typography>
      <TextField fullWidth multiline rows={2} label="Metrics" name="outcomes.metrics" value={formData.outcomes.metrics} onChange={handleChange} sx={{ my: 2 }} />
      <TextField fullWidth multiline rows={2} label="Testimonials" name="outcomes.testimonials" value={formData.outcomes.testimonials} onChange={handleChange} sx={{ mb: 4 }} />

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ borderRadius: 2, py: 1.5, px: 4 }}
      >
        {loading ? 'Submitting...' : editMode ? 'Update Case Study' : 'Submit Case Study'}
      </Button>

      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Card>
  );
}
