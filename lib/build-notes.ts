export type BuildNote = {
  title: string;
  intro: string;
  steps: readonly { label: string; title: string; detail: string }[];
};

export const quiblyBuild = {
  title: "How a chat message travels",
  intro: "A channel can include people connected to different server instances. Quibly uses the Socket.IO Redis adapter to carry room events across those instances.",
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

export const buildNotes: Partial<Record<string, BuildNote>> = {
  codexa: {
    title: "From submission to feedback",
    intro: "The problem judge connects two parts of Codexa’s practice loop. It gives each submission a result, and that result becomes part of the learner’s progress history.",
    steps: [
      {
        label: "Monaco editor",
        title: "Write and submit a solution",
        detail: "The problem library pairs each exercise with an in-browser editor, explanations, and test cases.",
      },
      {
        label: "Problem judge",
        title: "Evaluate the submission",
        detail: "The judge runs the solution against test cases and returns the result to the learner.",
      },
      {
        label: "Progress dashboard",
        title: "Record the attempt",
        detail: "The submission history feeds the progress heatmap and performance analytics. Live contests also use Socket.IO to update the leaderboard.",
      },
    ],
  },
  quibly: quiblyBuild,
  elevare: {
    title: "From an existing résumé to a scored draft",
    intro: "Elevare accepts the file a user already has. The same imported content can be scored against a job description, edited, or used to generate a portfolio.",
    steps: [
      {
        label: "Import",
        title: "Extract the résumé text",
        detail: "PDF imports use pdf-parse. Word imports use Mammoth.",
      },
      {
        label: "Gemini",
        title: "Score against ATS checks",
        detail: "The app explains what to fix and suggests wording changes for the target job description.",
      },
      {
        label: "Export",
        title: "Reuse the edited content",
        detail: "The user can export a print-ready PDF or use the same content to generate a portfolio.",
      },
    ],
  },
  lynkr: {
    title: "From a shared link to a visit",
    intro: "Lynkr puts link publishing and analytics in one workflow. Each link can be shared as a short URL or a QR code.",
    steps: [
      {
        label: "Page",
        title: "Publish a link",
        detail: "Links and social profiles live on a public page with a custom slug.",
      },
      {
        label: "Distribution",
        title: "Share a short URL or QR code",
        detail: "The same destination can be shared online as a short URL or printed as a QR code.",
      },
      {
        label: "Analytics",
        title: "See what people click",
        detail: "The dashboard shows page visits, link clicks, and click-through rate.",
      },
    ],
  },
  "console-me": {
    title: "From a match to a video room",
    intro: "Console Me uses Socket.IO for real-time signaling and LiveKit for the video call. The two tools handle different parts of the experience.",
    steps: [
      {
        label: "Matching",
        title: "Pair two people",
        detail: "The app connects people through instant matches or timed speed-date rounds.",
      },
      {
        label: "Socket.IO",
        title: "Signal the session",
        detail: "Socket.IO handles the real-time signaling that gets both participants into the session.",
      },
      {
        label: "LiveKit",
        title: "Run the video conversation",
        detail: "LiveKit handles video while the interface shows shared prompts. Users can save a match to continue the conversation later.",
      },
    ],
  },
};
