import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Box } from '@mui/material';
import bgBlue from '../../assets/blue.jpg';
import bgDark from '../../assets/dark.jpg';
import bgLight from '../../assets/light.jpg';

export default function PublicLayout({ children }) {
  const { themeName } = useContext(ThemeContext);
  console.log(themeName)
  const themeBackgrounds = {
    blue: 'url(' + bgBlue + ')',
    dark: 'url(' + bgDark + ')',
    light: 'url(' + bgLight + ')',
  };
  

  const backgroundImage = themeBackgrounds[themeName] || 'none';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      {children}
    </Box>
  );
}
