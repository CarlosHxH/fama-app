import { type Metadata } from "next";

import { JazigosClient } from "./jazigos-client";

export const metadata: Metadata = {
  title: "Jazigos",
};

export default function AdminJazigosPage() {
  return <JazigosClient />;
}
