"use client";

import Spinner from "@/components/ui/Spinner";
import ErrorBanner from "@/components/ui/ErrorBanner";
import UploadBox from "@/features/documents/components/UploadBox";
import DocumentList from "@/features/documents/components/DocumentList";
import { useDocuments } from "@/features/documents/hooks/useDocuments";
import { useUpload } from "@/features/documents/hooks/useUpload";

export default function DocumentsPage() {
  const { documents, loading, error, refresh, remove, download } = useDocuments();
  const { upload, uploading, error: uploadError } = useUpload(refresh);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:space-y-8 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Documents</h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload PDF documents to index and search with RAG. You can query them anytime in Chat.
        </p>
      </div>

      <UploadBox onFile={upload} uploading={uploading} error={uploadError} />
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <Spinner />
      ) : (
        <DocumentList documents={documents} onDownload={download} onDelete={remove} />
      )}
    </div>
  </div>
);
}