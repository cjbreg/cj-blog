import styled from '@emotion/styled';
import { useParams, Link } from 'react-router-dom';
import { posts } from 'virtual:blog-posts';

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 0.875rem;
  
  &::before {
    content: '← ';
  }
`;

const PostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const PostTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostMeta = styled.time`
  display: block;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PostContent = styled.article`
  h2 {
    margin-top: ${({ theme }) => theme.spacing.xxl};
  }
  
  h3 {
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

export const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <NotFound>
        <h1>Post Not Found</h1>
        <p>Sorry, the post you're looking for doesn't exist.</p>
        <Link to="/">← Back to home</Link>
      </NotFound>
    );
  }

  return (
    <>
      <BackLink to="/">Back to all posts</BackLink>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </PostMeta>
      </PostHeader>
      <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};