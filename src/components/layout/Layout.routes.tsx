import { Outlet } from 'react-router-dom';
import { Header } from '../shared/Header/Header';

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
