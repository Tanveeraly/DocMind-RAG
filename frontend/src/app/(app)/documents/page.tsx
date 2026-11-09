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
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-slate-500">Upload PDFs, then ask questions about them in Chat.</p>
      </div>

      <UploadBox onFile={upload} uploading={uploading} error={uploadError} />
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <Spinner />
      ) : (
        <DocumentList documents={documents} onDownload={download} onDelete={remove} />
      )}
    </div>
  );
}