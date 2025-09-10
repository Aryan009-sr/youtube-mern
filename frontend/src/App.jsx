import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const VideoPlayer = lazy(() => import('./pages/VideoPlayer'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const CreateChannelPage = lazy(() => import('./pages/CreateChannelPage'));
const ChannelPage = lazy(() => import('./pages/ChannelPage')) 
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Layout-based routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="video/:id" element={<VideoPlayer />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="create-channel" element={<CreateChannelPage />} />
              <Route path="channel/:channelId" element={<ChannelPage />} />
            </Route>
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;