
export type EventRequest = {
  associationId: number;
  sessionId?: number;
  startDate: string;
  endDate: string;
  eventType: string; 
  eventColor?: string;
  eventFor?: string;
  dateRangeValid?: boolean;
  sessionIdValid?: boolean;
};

export type EventResponse = {
  id: number;
  associationId: number;
  sessionId?: number;
  eventType: string;
  eventColor?: string;
  eventFor?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
};
