import type { ReactNode } from "react";
import { ClipDefs } from "../common/ClipDefs";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ReserveModal } from "./ReserveModal";
import { SearchOverlay } from "./SearchOverlay";
import { Toast } from "./Toast";
import { TopBar } from "./TopBar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <ClipDefs />
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <ReserveModal />
      <Toast />
    </div>
  );
}
