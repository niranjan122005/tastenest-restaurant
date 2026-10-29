import { useUI } from "../../context/UIContext";
import { Icon } from "../common/Icon";

export function Toast() {
  const { toast } = useUI();
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
      {toast && (
        <div className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-medium text-white shadow-xl">
          <Icon name="check" size={14} className="text-brand-yellow" />{toast}
        </div>
      )}
    </div>
  );
}
