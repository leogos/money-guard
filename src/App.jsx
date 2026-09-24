import { Route, Routes, Navigate } from 'react-router-dom';

import StatisticsTab from './pages/StatisticsTab/StatisticsTab';
import CurrencyTab from './pages/CurrencyTab/CurrencyTab';

const App = () => {
  return (
    <Routes>
      <Route path="/statistics" element={<StatisticsTab />} />
      <Route path="/currency" element={<CurrencyTab />} />

      <Route
        path="*"
        element={<Navigate to="/statistics" replace />}
      />
    </Routes>
  );
};

export default App;