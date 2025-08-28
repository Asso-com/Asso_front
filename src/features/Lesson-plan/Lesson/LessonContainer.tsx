// LessonContainer.tsx
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchLessons from "./hooks/useFetchLessons";
import LessonPresenter from "./LessonPresenter";

const LessonContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const {
    data: lessonLevels = [],
    // isLoading,
    // isError,
    // error,
  } = useFetchLessons(associationId);

  // const total = Array.isArray(lessonLevels) ? lessonLevels.length : 0;

  return (
    <LessonPresenter
      rows={lessonLevels}
      //total={total}
      // isLoading={isLoading}
      // isError={isError}
      //error={error ?? undefined}
    />
  );
};

export default LessonContainer;
