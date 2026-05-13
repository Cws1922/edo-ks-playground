import { KsButton } from '@byted-keystone/react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-medium">404</h1>
      <p className="text-neutral-lowOnSurface">This page doesn't exist.</p>
      <KsButton variant="secondary" onClick={() => navigate('/')}>
        Go Home
      </KsButton>
    </div>
  );
}
