import { BookOpen, Home, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { speak } from "../lib/audio";
import { AudioButton } from "./controls";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <Link className="brand-mark" to="/" aria-label="Penny and Pixel home">
          <span className="brand-icon" aria-hidden="true">
            PP
          </span>
          <span>
            <strong>Penny & Pixel</strong>
            <small>{online ? "Ready to play" : "Offline play ready"}</small>
          </span>
        </Link>
        <AudioButton
          className="round-button"
          cue={{ id: "hello", text: "Hi friend. Pick a world and play.", tone: "tap" }}
          aria-label="Hear welcome message"
        >
          <Sparkles aria-hidden="true" />
        </AudioButton>
      </header>
      <main>{children}</main>
      <nav className="bottom-nav" aria-label="Main navigation">
        <NavItem to="/" icon={<Home aria-hidden="true" />} label="Home" cue="Home world" />
        <NavItem to="/adventures" icon={<Sparkles aria-hidden="true" />} label="Play" cue="Pick an adventure" />
        <NavItem to="/stamp-book" icon={<BookOpen aria-hidden="true" />} label="Stamps" cue="Open stamp book" />
        <NavItem to="/parent" icon={<ShieldCheck aria-hidden="true" />} label="Parent" cue="Parent dashboard" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, cue }: { to: string; icon: React.ReactNode; label: string; cue: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={() => speak({ id: `nav-${label}`, text: cue, tone: "tap" })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
