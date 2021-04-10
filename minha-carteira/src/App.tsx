import React from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Dashboard />
      <Layout />
    </>
  )
}

export default App;