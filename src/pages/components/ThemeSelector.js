import React, { useContext } from 'react';
import { Box, Tooltip, IconButton, Typography } from '@mui/material';
import themes from '../../constants/themes'; // your theme config
import { ThemeContext } from '../../context/ThemeContext'; // custom theme context
import { updateProfileTheme } from '../../services/allApis';

export default function ThemeSelector({setSnackbar}) {
  const { themeName, setThemeName } = useContext(ThemeContext);

  const handleThemeChange = async (themeId) => {
    try {
      await updateProfileTheme({"theme":themeId});
      setThemeName(themeId);
      setSnackbar({
        open:true,
        message:"theme updated successfully",
        severity:"success"
      })
    } catch (err) {
      console.error('Failed to update theme:', err);
      setSnackbar({
        open:true,
        message:"failed to update theme",
        severity:"error"
      })
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Customize Appearance
      </Typography>
      {themes.map((theme) => (
        <Tooltip key={theme.id} title={theme.name} placement="bottom">
          <IconButton
            onClick={() => handleThemeChange(theme.id)}
            sx={{
              width: 30,
              height: 30,
              bgcolor: theme.previewColor,
              border: themeName === theme.id ? '2px solid #1976d2' : '2px solid transparent',
              transition: 'border 0.2s',
              '&:hover': {
                border: '2px solid #1976d2',
              },
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
}
