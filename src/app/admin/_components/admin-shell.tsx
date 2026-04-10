import { AdminAside } from "./admin-aside";
import { AdminHeader } from "./admin-header";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-jardim-cream md:h-screen md:flex-row md:overflow-hidden">
      <AdminAside />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto md:min-h-0">
        <AdminHeader />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
