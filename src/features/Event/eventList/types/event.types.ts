
export interface EventRequest {
  associationId: number;
  sessionId: number;
  startDate: string; 
  endDate: string;
  eventType: 'TASK' | 'PUBLIC' | 'SESSION';
  eventColor: string;
  eventFor: string;
  eventPoster: string;
  sessionIdValid: boolean;
  dateRangeValid: boolean;
}
export interface EventResponse {
  id: number;
  associationId: number;
  sessionId: number;
  eventType: string;
  eventColor: string;
  eventFor: string;
  eventPoster: string;
  startDate: string;  
  endDate: string;
  active: boolean;
  createdAt: string; 
}