import styled from "styled-components";
import { Card as MuiCard } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ListItem from "@material-ui/core/ListItem";

import OutlinedInput from "@material-ui/core/OutlinedInput";

export const MuiCardStyled = styled(MuiCard)`
  height: fit-content;
`;

export const CardContentStyled = styled(CardContent)`
  padding: 0;
  &:last-child {
    padding-bottom: 0px;
  }
`;

export const OutlinedInputStyled = styled(OutlinedInput)`
  input {
    padding: 8px;
    font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  }
`;

export const CardHeaderStyled = styled(CardHeader)`
  .MuiCardHeader-action {
    margin: 0;
  }
`;

export const ListItemStyled = styled(ListItem)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: ${({ theme }) => theme.border};
  &:last-child {
    border-bottom: none;
  }
`;

export const TextDiv = styled.div`
  text-align: left;
`;

export const VersionDiv = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.palette.text.disabled};
`;

export const StatusDiv = styled.div`
  text-align: right;
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.text.disabled};
`;

export const StatusGreenDiv = styled(StatusDiv)`
  color: ${({ theme }) => theme.palette.text.success};
`;

export const PaddedDiv = styled.div`
  padding: 0 16px 16px 16px;
`;
