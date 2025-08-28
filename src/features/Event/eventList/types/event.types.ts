export interface EventRequest {
  associationId: number;
  sessionId?: number; 
  title: string;
  description: string;
  startDate: string; 
  endDate: string; 
  eventType: 'TASK' | 'PUBLIC' | 'SESSION';
  eventColor?: string;
  eventPoster?: File; 
}

export interface EventResponse {
  id: number;
  associationId: number;
  sessionId?: number;
  title: string;
  description: string;
  eventType: string;
  eventColor?: string;
  eventPoster?: string; 
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
  createdBy?: string; 
}

export interface EventFormValues {
  title: string;
  associationId: number; // Added to match the request structure
  description: string;
  startDate: string;
  endDate: string;
  eventType: 'TASK' | 'PUBLIC' | 'SESSION';

  eventColor?: string;
  sessionId?: number;
  eventPoster?: File;
}

export const createEventFormData = (values: EventFormValues): FormData => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('startDate', values.startDate);
  formData.append('endDate', values.endDate);
  formData.append('eventType', values.eventType);  
  if (values.eventColor) {
    formData.append('eventColor', values.eventColor);
  }
  
  if (values.sessionId && values.eventType === 'SESSION') {
    formData.append('sessionId', values.sessionId.toString());
  }
  
  if (values.eventPoster) {
    formData.append('eventPoster', values.eventPoster);
  }
  
  return formData;
};