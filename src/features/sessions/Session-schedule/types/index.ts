export interface SessionSchuduleDate {
  sessionCode: string;
  sessionDateId: number;
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
  sessionType: "ONSITE" | "ONLINE";
}
    // "sessionCode": "Quatrième-Français-Chaïma-24141",
    // "sessionDateId": 1,
    // "date": "2025-09-02",
    // "startTime": "09:00",
    // "endTime": "10:00",
    // "day": "TUESDAY",
    // "classRoom": "Berlioz - Salle 2",
    // "firstName": "Chaïma",
    // "lastName": "TOUATI",
    // "level": "Quatrième",
    // "subject": "Français",
    // "linguisticLevel": "",
    // "quizNumber": 1,
    // "sessionType": "ONSITE",
    // "validated": false,
    // "attendanceMarked": false,
    // "canceled": false

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
