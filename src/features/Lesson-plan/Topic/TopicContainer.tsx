import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchTopics from "./hooks/useFetchTopics";
import TopicPresenter from "./TopicPresenter";

const TopicContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const {
    data: topicLevels = [],
    isLoading,
    isError,
    error,
  } = useFetchTopics(associationId);

  const total = Array.isArray(topicLevels) ? topicLevels.length : 0;

  return (
    <TopicPresenter
      rows={topicLevels}
      total={total}
      isLoading={isLoading}
      isError={isError}
      error={error ?? undefined}
    />
  );
};

export default TopicContainer;
