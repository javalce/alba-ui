import { getDocuments } from '@/services/document';

export async function DocumentList({ query }: { query?: string }) {
  const documents = await getDocuments(query);

  return (
    <section className='space-y-2'>
      {documents.map((document) => (
        <article key={document.id}>{document.name}</article>
      ))}
    </section>
  );
}
