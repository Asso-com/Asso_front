import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import BookListPresenter from "./BookListPresenter";
import useFetchBooks from "./hooks/useFetchBooks";

const BookListContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data: books = [] } = useFetchBooks(associationId);
  return <BookListPresenter rows={books} total={books?.length} />;
};

export default BookListContainer;
