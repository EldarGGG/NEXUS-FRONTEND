'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page as the main entry point
    router.replace('/signin');
  }, [router]);

  // Show loading while redirecting
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2563eb', marginBottom: '1rem' }}>🛍️ Nexus Market</h1>
        <p style={{ color: '#6b7280' }}>Загрузка...</p>
      </div>
    </div>
  );
}
