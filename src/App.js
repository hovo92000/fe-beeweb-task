import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import WorkspacesList from './pages/Workspaces/List/List';
import WorkspaceCreate from './pages/Workspaces/Create/Create';
import WorkspaceEdit from './pages/Workspaces/Edit/Edit';
import NotFound from './pages/NotFound/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>  {/* all below require auth */}
              <Route path="/workspaces" element={<WorkspacesList />} />
              <Route path="/workspaces/create" element={<WorkspaceCreate />} />
              <Route path="/workspaces/:id/edit" element={<WorkspaceEdit />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;