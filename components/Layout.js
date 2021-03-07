import { AppBar } from './AppBar';

export function Layout({ children })
{
  return (
    <div className="h-100 grid pancake-layout">
      <AppBar />
      {children}
    </div>
  );
}
