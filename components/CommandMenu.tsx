"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, ExternalLink, Folder, Hash, Moon, Search } from "lucide-react";
import { caseStudies, profile } from "@/lib/data";
import { OPEN_COMMAND_MENU } from "@/lib/events";
import { toggleTheme } from "@/lib/theme";

const socialNames = { github: "GitHub", linkedin: "LinkedIn", x: "X" };

type Command = {
  id: string;
  group: "Go to" | "Case studies" | "Actions";
  label: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandMenu() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const show = useCallback(() => {
    const element = dialog.current;
    if (!element || element.open) return;
    setQuery("");
    setActive(0);
    element.showModal();
    input.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      if (dialog.current?.open) dialog.current.close();
      else show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, show);
    };
  }, [show]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const commands = useMemo<Command[]>(() => [
    ...["Work", "Experience", "Skills", "About", "Contact"].map((label) => ({
      id: `go-${label.toLowerCase()}`,
      group: "Go to" as const,
      label,
      icon: <Hash size={16} />,
      run: () => router.push(`/#${label.toLowerCase()}`),
    })),
    ...caseStudies.map((project) => ({
      id: `case-${project.slug}`,
      group: "Case studies" as const,
      label: project.name,
      icon: <Folder size={16} />,
      run: () => router.push(`/work/${project.slug}`),
    })),
    {
      id: "copy-email",
      group: "Actions",
      label: "Copy email address",
      icon: <Copy size={16} />,
      run: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setToast("Email address copied.");
        } catch {
          setToast("The email address is in the contact section.");
        }
      },
    },
    {
      id: "theme",
      group: "Actions",
      label: "Switch theme",
      icon: <Moon size={16} />,
      run: toggleTheme,
    },
    ...Object.entries(socialNames).map(([key, name]) => ({
      id: `open-${key}`,
      group: "Actions" as const,
      label: `Open ${name}`,
      icon: <ExternalLink size={16} />,
      run: () => window.open(profile.links[key as keyof typeof socialNames], "_blank", "noopener"),
    })),
  ], [router]);

  const search = query.trim().toLowerCase();
  const results = commands.filter((command) => `${command.label} ${command.group}`.toLowerCase().includes(search));
  const selected = results[active];

  function run(command?: Command) {
    if (!command) return;
    dialog.current?.close();
    command.run();
  }

  function handleKeys(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      run(selected);
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!results.length) return;
    const offset = event.key === "ArrowDown" ? 1 : -1;
    const next = (active + offset + results.length) % results.length;
    setActive(next);
    document.getElementById(results[next].id)?.scrollIntoView({ block: "nearest" });
  }

  return (
    <>
      <dialog
        ref={dialog}
        aria-label="Command menu"
        className="command-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="command-content">
          <div className="command-search">
            <Search size={18} aria-hidden="true" />
            <input
              ref={input}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={handleKeys}
              placeholder="Find a section, project, or action"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={selected?.id}
              autoComplete="off"
            />
            <kbd>Esc</kbd>
          </div>
          <ul id="command-list" className="command-results" role="listbox" aria-label="Commands">
            {results.map((command, index) => (
              <li
                key={command.id}
                id={command.id}
                role="option"
                aria-selected={index === active}
                onClick={() => run(command)}
                onPointerMove={() => setActive(index)}
              >
                <span aria-hidden="true">{command.icon}</span>
                {command.label}
              </li>
            ))}
          </ul>
          {results.length === 0 && <p className="command-empty" role="status">No matching commands.</p>}
        </div>
      </dialog>
      <p className="command-toast" role="status" data-visible={Boolean(toast)}>{toast}</p>
    </>
  );
}
