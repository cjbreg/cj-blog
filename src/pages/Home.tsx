import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { posts } from 'virtual:blog-posts';

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const PostCard = styled.article`
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  a {
    color: ${({ theme }) => theme.colors.text};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PostMeta = styled.time`
  display: block;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostSummary = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0;
`;

export const Home = () => {
  return (
    <PostList>
      {posts.map((post) => (
        <PostCard key={post.slug}>
          <PostTitle>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </PostTitle>
          <PostMeta dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </PostMeta>
          {post.summary && <PostSummary>{post.summary}</PostSummary>}
        </PostCard>
      ))}
    </PostList>
  );
};