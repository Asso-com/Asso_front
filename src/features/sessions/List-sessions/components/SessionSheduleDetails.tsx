import type { Session } from "../data";

interface SessionScheduleDetailsProps {
  sessionData: Session;
}

const SessionScheduleDetails: React.FC<SessionScheduleDetailsProps> = ({
  sessionData,
}) => {
  return <>Comming soon {sessionData.id}</>;
};

export default SessionScheduleDetails;
