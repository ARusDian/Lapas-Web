interface LogType {
  id: number;
  userId: number;
  user: {
    id: number,
    name: string,
    email: string,
  };
  type: "KEBAKARAN" | "BENCANA" | "RUSUH";
  createdAt: string;
}

export type { LogType };