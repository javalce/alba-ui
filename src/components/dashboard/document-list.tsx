import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDocuments } from '@/services/document';

export async function DocumentList({ query }: { query?: string }) {
  const documents = await getDocuments(query);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Total decretos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell>{document.name}</TableCell>
            <TableCell>{document.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
