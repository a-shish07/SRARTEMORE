import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface NotifContextType {
  show: (msg: string) => void;
}

const NotifContext = createContext<NotifContextType | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  const show = useCallback((message: string) => {
    setMsg(message);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <NotifContext.Provider value={{ show }}>
      {children}
      <div className={`notif${visible ? " show" : ""}`}>
        <span className="check">✓</span>
        <span>{msg}</span>
      </div>
    </NotifContext.Provider>
  );
}

export function useNotif() {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error("useNotif must be inside NotifProvider");
  return ctx;
}
