'use client';

import React from 'react';
import { AudioController } from '@/components/audio/AudioController';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <AudioController />
      {children}
    </>
  );
}

export default ClientLayout;
