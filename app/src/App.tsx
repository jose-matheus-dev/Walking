import { AppProvider } from '@/context';
import { Journal } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route index element={<Navigate to="/journal" replace />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
