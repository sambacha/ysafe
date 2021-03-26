import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { Title } from "@gnosis.pm/safe-react-components";

import VaultsTable from "./components/VaultsTable";
import theme from "./theme";

const VaultsOuterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 6px 24px;
  width: calc(100% - 48px);
`;

const TableWrapper = styled.div`
  flex-grow: 1;
`;

const TopLeftHorizontalWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

const StyledTitle = styled(Title)`
  margin-left: 10px;
`;

const SecretText = styled(StyledTitle)`
  color: #eeeeee;
  opacity: 0.2;
`;

const YearnApp: React.FC = () => (
  <ThemeProvider theme={theme}>
    <VaultsOuterWrapper>
      <TopLeftHorizontalWrapper>
        <img src="logo.svg" alt="YFI Logo" height="30px" />
        <StyledTitle size="xs">Yearn Finance Vaults</StyledTitle> <SecretText size="xs">Oh my</SecretText>
      </TopLeftHorizontalWrapper>
      <TableWrapper>
        <VaultsTable />
      </TableWrapper>
    </VaultsOuterWrapper>
  </ThemeProvider>
);

export default YearnApp;
