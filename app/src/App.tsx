import { Journal } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/journal" replace />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  );
}

export default App;
