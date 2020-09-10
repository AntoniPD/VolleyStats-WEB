/**
 *
 * Button
 *
 */

import { Button as MuiButton } from "@material-ui/core";
import styled from "styled-components";

const Button = styled(MuiButton)`
  text-transform: none;
  line-height: 17px;
  height: 40px;
  &:hover {
    box-shadow: 5px 5px #888888;
  }
  width: fit-content;
`;

export default Button;
