import { notFound } from 'next/navigation';
import { loadPastes } from '@/lib/pastes';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params;
  const pastes = await loadPastes();
  const paste = pastes[id];

  if (!paste) {
    notFound();
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '2rem', 
      fontFamily: 'monospace' 
    }}>
      <h1>Pastebin-Lite</h1>
      <div style={{
        background: '#f5f5f5',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '16px' }}>
          {paste.content}
        </pre>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Views: {paste.remaining_views ?? 'unlimited'} | 
        Expires: {paste.expires_at ? new Date(paste.expires_at).toLocaleString() : 'never'}
      </p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>← New paste</a>
    </div>
  );
}
