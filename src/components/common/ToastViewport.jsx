import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const styles = {
  error: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-300",
    icon: <FaExclamationCircle className="text-red-400" />,
  },
  success: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    text: "text-green-300",
    icon: <FaCheckCircle className="text-green-400" />,
  },
};

function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-index:100 flex flex-col gap-3 w-full max-w-sm">
      {toasts.map((toast) => {
        const style = styles[toast.type] || styles.error;
        return (
          <div
            key={toast.id}
            role="alert"
            className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm px-4 py-3 shadow-lg shadow-black/30 animate-in`}
          >
            <span className="mt-0.5 text-lg shrink-0">{style.icon}</span>
            <p className={`text-sm ${style.text} flex-1`}>{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-500 hover:text-slate-300 transition"
              aria-label="Dismiss"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastViewport;
