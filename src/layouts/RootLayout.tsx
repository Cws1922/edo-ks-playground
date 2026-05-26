import { Outlet } from 'react-router-dom';
import { Agentation } from 'agentation';
import DevNav from '@/infra/DevNav';

export default function RootLayout() {
  return (
    <div>
      <Outlet />
      <DevNav />
      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}
