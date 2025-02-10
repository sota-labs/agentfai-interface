export type TMessage = {
  id: string;
  agentId: string;
  threadId: string;
  question: string;
  answer: string;
  status?: string;
  createdAt: number;
  updatedAt: number;
};
