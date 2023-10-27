interface PushButtonLog {
  id: number;
  buttonId: number;
  userId: number;
  user: string;
  type: "KEBAKARAN" | "BENCANA" | "RUSUH";
  created_at: string;
  updated_at: string;
}

export type { PushButtonLog };