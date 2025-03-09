"use client";

import { AppStore, makeStore } from "../Redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef<AppStore | null>(null);
  if (!store.current) {
    store.current = makeStore();
  }
  return <Provider store={store.current}>{children}</Provider>;
}
