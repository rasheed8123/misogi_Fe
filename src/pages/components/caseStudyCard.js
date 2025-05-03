import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button
} from '@mui/material';
import themeConstent from '../../constants/themes';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function CaseStudyCard({ caseStudy, onView, onEdit }) {
  const {
    title,
    overview,
    media,
    tools
  } = caseStudy;

  const { themeName } = useContext(ThemeContext);
  const selectedTheme = themeConstent.find(t => t.id === themeName) || themeConstent[0];

  return (
    <Card
      sx={{
        backgroundColor: selectedTheme.previewColor,
        boxShadow:
          themeName === 'dark'
            ? '0 4px 12px rgba(255,255,255,0.1)'
            : themeName === 'blue'
            ? '0 4px 20px rgba(25, 118, 210, 0.3)'
            : '0 4px 10px rgba(0,0,0,0.1)',
        color: themeName === 'dark' ? '#fff' : '#000',
        borderRadius: 3,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 350, 
        width: 300,
        overflow: 'hidden',
        backgroundImage:
          themeName === 'blue'
            ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
            : themeName === 'dark'
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)'
            : 'none'
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ pb: 0 }}
      />
      {media?.[0] ? (() => {
          const url = media[0];
          const extension = url.split('.').pop().toLowerCase();

          if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
            return (
              <CardMedia
                component="img"
                height="150"
                image={url}
                alt="Case study media"
                sx={{ objectFit: 'cover' }}
              />
            );
          } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
            return (
              <Box sx={{ height: 150 }}>
                <video
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                >
                  <source src={url} type={`video/${extension}`} />
                  Your browser does not support the video tag.
                </video>
              </Box>
            );
          } else {
            return (
              <Box
                sx={{
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                  px: 2,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'primary.main', textDecoration: 'underline' }}
                >
                  View Media File
                </Typography>
              </Box>
            );
          }
        })() : (
          <Box sx={{ height: 150, backgroundColor: '#ccc' }} />
        )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: themeName === 'dark' ? '#aaa' : 'text.secondary' }}
          gutterBottom
        >
          {overview ? overview.slice(0, 120) + '...' : 'No overview provided.'}
        </Typography>

        {tools?.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tools.map((tool, idx) => (
              <Chip key={idx} label={tool} size="small" />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" onClick={onView}>View</Button>
        <Button size="small" onClick={onEdit}>Edit</Button>
      </CardActions>
    </Card>
  );
}
