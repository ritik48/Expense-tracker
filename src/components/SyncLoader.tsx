import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

export function SyncLoader() {
  const status = useSelector((state: any) => state.sync.syncStatus);
  console.log({ status });

  return status === "syncing" ? (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="flex items-center justify-center gap-4 rounded-md bg-white p-6 text-center">
        <ClipLoader size={20} color="grey" />
        <span className="text-sm font-semibold">Syncing...</span>
      </div>
    </div>
  ) : null;
}
