// themes.js
const themes = [
  {
    id: 'light',
    name: 'Light Theme',
    previewColor: '#f5f5f5',
    cardStyle: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundImage: 'url(/images/light-bg.png)',
      backgroundSize: 'cover'
    }
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    previewColor: '#1e1e1e',
    cardStyle: {
      backgroundColor: '#2a2a2a',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      backgroundImage: 'url(/images/dark-bg.png)',
      backgroundSize: 'cover'
    }
  },
  {
    id: 'blue',
    name: 'Blue Accent',
    previewColor: '#e3f2fd',
    cardStyle: {
      backgroundColor: '#bbdefb',
      boxShadow: '0 2px 10px rgba(33,150,243,0.4)',
      backgroundImage: 'url(/images/blue-bg.png)',
      backgroundSize: 'cover'
    }
  }
];

export default themes;
