export type BuildNote = {
  title: string;
  steps: readonly { label: string; title: string; detail: string }[];
};

export const quiblyBuild = {
  title: "How a chat message travels",
  steps: [
    {
      label: "Browser",
      title: "Send to the server",
      detail: "The browser sends a new message through its Socket.IO connection.",
    },
    {
      label: "Socket.IO",
      title: "Broadcast to the room",
      detail: "The server emits the message to listeners in the channel’s Socket.IO room.",
    },
    {
      label: "Redis",
      title: "Reach other servers",
      detail: "The Redis adapter relays the event so people connected to another instance receive the message too.",
    },
  ],
} satisfies BuildNote;
