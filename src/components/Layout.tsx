import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SiteTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0;
  
  a {
    color: ${({ theme }) => theme.colors.text};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header>
        <SiteTitle>
          <Link to="/">CJ's Blog</Link>
        </SiteTitle>
      </Header>
      <main>{children}</main>
    </Container>
  );
};