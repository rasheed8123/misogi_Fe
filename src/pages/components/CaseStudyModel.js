import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
    Box,
    Chip,
    Divider,
    Grid,
    CircularProgress
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { useContext, useEffect, useState } from 'react';
  import { ThemeContext } from '../../context/ThemeContext';
  import themeConstent from '../../constants/themes';
  import { getCaseStudyById,getCaseStudyByIdforPublic  } from '../../services/allApis';
  import { AuthContext } from '../../context/AuthContext';
  
  export default function CaseStudyModal({ open, handleClose, caseStudyId }) {
    const { themeName } = useContext(ThemeContext);
    const selectedTheme = themeConstent.find(t => t.id === themeName) || themeConstent[0];
    const { user } = useContext(AuthContext);
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (open && caseStudyId) {
        const fetchData = async () => {
          setLoading(true);
          try {
              const { data } = await getCaseStudyById(caseStudyId)
              console.log("data",data)
              setCaseStudy(data);
           
          } catch (err) {
            console.error('Failed to fetch case study', err);
          } finally {
            setLoading(false);
          }
        };
  
        fetchData();
      }
    }, [open, caseStudyId]);
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: selectedTheme.previewColor,
            color: themeName === 'dark' ? '#fff' : '#000',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {caseStudy?.title || 'Loading...'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers sx={{ py: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : caseStudy ? (
            <>
              {/* Overview */}
              <Typography variant="subtitle1" fontWeight={600}>Overview</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {caseStudy.overview || 'No overview provided.'}
              </Typography>
  
              {/* Media */}
              {caseStudy.media?.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight={600}>Media</Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                  {caseStudy.media.map((url, i) => (
                    <Typography
                    key={i}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: themeName === 'dark' ? '#90caf9' : '#1976d2',
                        textDecoration: 'underline',
                        wordBreak: 'break-all'
                    }}
                    >
                    {url}
                    </Typography>
                ))}
                  </Grid>
                </>
              )}
  
              {/* Timeline */}
              {caseStudy.timeline?.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight={600}>Timeline</Typography>
                  <Box sx={{ mb: 2 }}>
                    {caseStudy.timeline.map((item, i) => (
                      <Box key={i} sx={{ mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {item.phase} – {new Date(item.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">{item.description}</Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
  
              {/* Tools */}
              {caseStudy.tools?.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight={600}>Tools</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {caseStudy.tools.map((tool, i) => (
                      <Chip key={i} label={tool} size="small" />
                    ))}
                  </Box>
                </>
              )}
  
              {/* Outcomes */}
              {(caseStudy.outcomes?.metrics || caseStudy.outcomes?.testimonials) && (
                <>
                  <Typography variant="subtitle1" fontWeight={600}>Outcomes</Typography>
                  {caseStudy.outcomes.metrics && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Metrics:</strong> {caseStudy.outcomes.metrics}
                    </Typography>
                  )}
                  {caseStudy.outcomes.testimonials && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Testimonials:</strong> {caseStudy.outcomes.testimonials}
                    </Typography>
                  )}
                </>
              )}
  
              <Divider sx={{ my: 2 }} />
  
              {/* Analytics Info */}
              <Typography variant="body2">
                <strong>Views:</strong> {caseStudy.views}  | <strong>Created:</strong> {new Date(caseStudy.createdAt).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <Typography>No data found.</Typography>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  