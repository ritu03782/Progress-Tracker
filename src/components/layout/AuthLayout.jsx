import logo from "../../assets/logo.png";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / brand header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src={logo}
            alt="Progress Tracker Logo"
            className="w-16 h-16 rounded-2xl object-cover shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold">Placement</h1>
            <p className="text-slate-400 text-sm">Progress Tracker</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-lg shadow-black/30 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>

          {children}
        </div>

        {footer && <div className="text-center mt-6 text-sm text-slate-400">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthLayout;
