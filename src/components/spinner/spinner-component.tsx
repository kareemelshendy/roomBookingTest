import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;
export const SpinnerComponent = () => {
  return <BeatLoader color={"#ffffff"} loading={true} css={override} size={10} />;
};
