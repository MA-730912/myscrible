'use client';

import Summariser from '../components/Summariser';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Voice Scribe</h1>
      <Summariser />
    </main>
  );
}
