import EmptyState from "@/components/ui/EmptyState";
import DocumentItem from "./DocumentItem";
import type { DocumentItem as Doc } from "../types";

type Props = { documents: Doc[]; onDownload: (id: number) => void; onDelete: (id: number) => void };

export default function DocumentList({ documents, onDownload, onDelete }: Props) {
  if (documents.length === 0) {
    return <EmptyState title="No documents yet" hint="Upload a PDF above to get started." />;
  }
  return (
    <ul className="space-y-3">
      {documents.map((d) => (
        <DocumentItem key={d.id} doc={d} onDownload={onDownload} onDelete={onDelete} />
      ))}
    </ul>
  );
}