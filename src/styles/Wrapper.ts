import styled from 'styled-components';

const defaultHeaderHeight = '64px';
const defaultFooterHeight = '48px';

export const DefaultWrapper = styled.div`
  min-height: calc(100vh - ${defaultHeaderHeight} - ${defaultFooterHeight});
`;
