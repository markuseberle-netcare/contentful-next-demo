
import { getClient } from '@/lib/contentful';

export const revalidate = 0;

async function getData() {
  const client = getClient(process.env.NEXT_PUBLIC_ENABLE_PREVIEW === 'true');
  const pages = await client.getEntries({
    content_type: 'page',
    include: 2,
    limit: 10,
  });
  return pages;
}

export default async function Debug() {
  const data = await getData();
  const items = data?.items ?? [];
  return (
    <main style={{padding: 20}}>
      <h1>Debug: pages</h1>
      <p>items.length: <b>{items.length}</b></p>
      <ul>
        {items.map((it: any) => (
          <li key={it.sys.id}>
            id: {it.sys.id} | slug: {(it.fields?.slug as any) || '(none)'} | type: {it.sys.contentType?.sys?.id}
          </li>
        ))}
      </ul>
      <pre style={{whiteSpace:'pre-wrap', fontSize:12, background:'#111', color:'#eee', padding:10, borderRadius:8}}>
        {JSON.stringify({ total: data.total, limit: data.limit, skip: data.skip }, null, 2)}
      </pre>
    </main>
  );
}
