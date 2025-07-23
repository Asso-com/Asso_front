import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import  useFetchVerificationCode  from "./hooks/useFetchVerificationCode";
import VerificationCodePresenter from "./VerificationCodePresenter";

const VerificationCodeContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data = []} = useFetchVerificationCode(associationId);

  return (
    <VerificationCodePresenter
      rows={data}
      total={data.length}
    />
  );
};

export default VerificationCodeContainer;
