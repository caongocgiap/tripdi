import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "@/components/layout/Dashboard";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/404/NotFound";
import Forbidden from "@/pages/403/Forbidden";
import { PREFIX_ADMIN, PREFIX_ADMIN_ALBUM, PREFIX_HOME, PREFIX_USER_ALBUM_DETAIL } from "@/constants/url.constant";
import { Spinner } from "@/components/ui/spinner";
import AlbumDetail from "@/pages/user/AlbumDetail";
import { ProtectedRoute } from "./guard/ProtectedRoute";
import LoginPage from "@/pages/login";

const UserPage = lazy(() => import('@/pages/user'));
const AdminPage = lazy(() => import('@/pages/admin'));
const AlbumPage = lazy(() => import('@/pages/admin/album'));

type RouteType = {
  path: string;
  element: React.ReactNode;
  children?: RouteType[];
};

const withDashboard = (Component: React.ReactNode) => {
  return (
    <Dashboard>
      <Suspense fallback={<Spinner className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}>{Component}</Suspense>
    </Dashboard>
  );
};

const withLayout = (Component: React.ReactNode) => {
  return (
    <Layout>
      <Suspense fallback={<Spinner className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}>{Component}</Suspense>
    </Layout>
  );
};

const RouteList = () => {
  const routes: RouteType[] = [
    { path: "*", element: <NotFound /> },
    { path: "/403", element: <Forbidden /> },
    { path: "/login", element: <LoginPage /> },
    { path: `${PREFIX_HOME}`, element: withLayout(<UserPage />) },
    { path: `${PREFIX_USER_ALBUM_DETAIL}/:albumId`, element: <AlbumDetail /> },
    {
      path: `${PREFIX_ADMIN}`,
      element: (
        <ProtectedRoute>
          {withDashboard(<AdminPage />)}
        </ProtectedRoute>
      )
    },
    {
      path: `${PREFIX_ADMIN_ALBUM}`,
      element: (
        <ProtectedRoute>
          {withDashboard(<AlbumPage />)}
        </ProtectedRoute>
      )
    }
  ];

  const element = useRoutes(routes);
  return <Suspense fallback={<Spinner className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}>{element}</Suspense>;
}

export default RouteList;