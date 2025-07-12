// routes/protectedRoutes.tsx
import ProtectedLayout from "../layouts/private-layout";
import DashboardPage from "../features/dashboard/DashoardPage";
import SchoolYearSettingsContainer from "@features/system-settings/school-year-settings/SchoolYearSettingsContainer";
import StudentDetailsContainer from "@features/student-info/student-details/StudentDetailsContainer";
import LinguisticLevelsRegistrationContainer from "@features/student-info/not-academic-enrollments/NotAcademicEnrollmentsContainer";
import LocationOfStudentContainer from "@features/student-info/location-student/LocationStudentContainer";
import PaymentsContainer from "@features/student-info/payments/PaymentsContainer";
import AddSessionContainer from "@features/sessions/Add-session/AddSessionContainer";
import ListStudentSessionContainer from "@features/sessions/list-student-session/ListStudentSessionContainer";
import SessionsConsultationContainer from "@features/sessions/Sessions-consultation/SessionsConsultationContainer";
import AttendanceTrackingContainer from "@features/sessions/Attendance-tracking/AttendanceTrackingContainer";
import SessionScheduleContainer from "@features/sessions/Session-schedule/SessionScheduleContainer";
import ListSessionsContainer from "@features/sessions/List-sessions/ListSessionsContainer";
import ListLevelContainer from "@features/Academics/list-level/ListLevelContainer";
import ListSubjectContainer from "@features/Academics/Subject/ListSubjectContainer";
import SubjectLevelContainer from "@features/Academics/Subject-level/SubjectLevelContainer";
import ListPartnerContainer from "@features/Partner/list-partner/ListPartnerContainer";
import AcademicPeriodWeeksContainer from "@features/system-settings/academic-period-weeks/AcademicPeriodWeeksContainer";
import DepartmentContainer from "@features/Academics/department/DepartmentContainer";
import CategoriesLevelsContainer from "@features/Academics/Categories-levels/CategoriesLevelsContainer";
import StaffContainer from "@features/human-resource/staff/StaffContainer";
import ClassRoomContainer from "@features/Academics/Class-room/ClassRoomContainer";
import CoefficientSettingsContainer from "@features/system-settings/coefficients/CoefficientSettingsContainer.tsx";
import LessonContainer from "@features/Lesson-plan/Lesson/LessonContainer.tsx";
import TopicContainer from "@features/Lesson-plan/Topic/TopicContainer.tsx";
import LocationContainer from "@features/Partner/location/LocationContainer";
import ListOnlyPartenersPage from "@features/Partner/List-only-partners/ListOnlyPartenersPage";
import BookListContainer from "@features/Library/BookListContainer";
import EventListContainer from "@features/Event/eventList/EventListContainer";
import FamilyDetailsContainer from "@features/gestionFamily/family-details/FamilyDetailsContainer";
import ListReunionContainer from "@features/gestionFamily/list-reunion-family/ListReunionContainer";
const protectedRoutes = [
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      {
        path: "/Settings/SessionSetting",
        element: <SchoolYearSettingsContainer />,
      },
      {
        path: "/Settings/AcademicPeriodWeeks",
        element: <AcademicPeriodWeeksContainer />,
      },
      {
        path: "/Student/StudentInformation",
        element: <StudentDetailsContainer />,
      },
      {
        path: "/Student/GeographicalLocationofStudentAddresses",
        element: <LocationOfStudentContainer />,
      },
      {
        path: "/Student/LinguisticLevelsRegistration",
        element: <LinguisticLevelsRegistrationContainer />,
      },
      {
        path: "/Student/StudentInformation",
        element: <StudentDetailsContainer />,
      },
      { path: "/Student/Payments", element: <PaymentsContainer /> },

      { path: "/Sessions/listSessions", element: <ListSessionsContainer /> },
      { path: "/Sessions/AddSession", element: <AddSessionContainer /> },
      {
        path: "/Sessions/listStudentSession",
        element: <ListStudentSessionContainer />,
      },
      {
        path: "/Sessions/SessionsConsultation",
        element: <SessionsConsultationContainer />,
      },
      {
        path: "/Sessions/AttendanceTracking",
        element: <AttendanceTrackingContainer />,
      },
      {
        path: "/Sessions/SessionSchedule",
        element: <SessionScheduleContainer />,
      },

      { path: "/partner/associations", element: <ListPartnerContainer /> },
      {
        path: "/partner/associations/locations",
        element: <LocationContainer />,
      },
      { path: "/partner/list", element: <ListOnlyPartenersPage /> },

      { path: "/LessonPlan/Lesson", element: <LessonContainer /> },
      { path: "/LessonPlan/Topic", element: <TopicContainer /> },

      { path: "/Academics/listLevel", element: <ListLevelContainer /> },
      { path: "/Academics/listSubject", element: <ListSubjectContainer /> },
      { path: "/Academics/SubjectLevel", element: <SubjectLevelContainer /> },
      { path: "/Academics/ClassRoom", element: <ClassRoomContainer /> },
      {
        path: "/Academics/CategoriesLevels",
        element: <CategoriesLevelsContainer />,
      },
      { path: "/Academics/Department", element: <DepartmentContainer /> },

      {
        path: "/Settings/CoefficientSetting",
        element: <CoefficientSettingsContainer />,
      },

      { path: "/HumanResource/listStaff", element: <StaffContainer /> },

      { path: "/Library/BookList", element: <BookListContainer /> },
      { path: "/Events/EventList", element: <EventListContainer /> },
      { path: "/families", element: <FamilyDetailsContainer /> },
      { path: "/list-reu-families", element: <ListReunionContainer /> },
    ],
  },
];

export default protectedRoutes;
