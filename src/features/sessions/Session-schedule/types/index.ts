export interface SessionSchuduleDate {
  sessionDateId: string;
  date: string;
  attendanceMarked: boolean;
  validated: boolean;
  canceled: boolean;
  startTime: string;
  endTime: string;
  day: string;
  classRoom: string;
  firstName: string;
  lastName: string;
  level: string;
  subject: string;
  linguisticLevel?: string;
  quizNumber: number;
}

    //  "sessionDateId": 1,
    //     "date": "2025-09-08",
    //     "startTime": "09:00",
    //     "endTime": "10:00",
    //     "day": "MONDAY",
    //     "classRoom": "",
    //     "firstName": "Chaïma",
    //     "lastName": "TOUATI",
    //     "level": "Sixième",
    //     "subject": "Français",
    //     "linguisticLevel": "",
    //     "quizNumber": 1,
    //     "sessionType": "ONLINE",
    //     "attendanceMarked": false,
    //     "canceled": false,
    //     "validated": false
