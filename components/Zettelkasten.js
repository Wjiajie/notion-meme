import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import PropTypes from 'prop-types';
import BlogPost from '@/components/BlogPost';

const Zettelkasten = ({ posts }) => {
  const [zettelkastenPosts, setZettelkastenPosts] = useState([]);

  useEffect(() => {
    // 过滤出所有类型为"Zpage"的posts，并按照层级排序
    const filteredPosts = posts.filter(post => post.type.includes("Zpage"));
    setZettelkastenPosts(filteredPosts);
  }, [posts]);

  // 根据层级动态设置字号和缩进
  const getStyles = (layer) => {
    // 定义层级到字号的映射
    const fontSizeMap = {
      1: 'xl',
      2: 'xl',
    };

    // 计算缩进
    const marginLeft = `${layer * 30}px`; // 每层缩进30px

    layer = layer > 1 ? 2 : 1;
    const fontSize = fontSizeMap[layer];

    return {
      style: {
        marginLeft,
      },
      className: `text-${fontSize} mb-3 hover:scale-105 transition duration-300 ease-out`,
    };
  };

  return (
    <Container>
      {zettelkastenPosts.map(post => (
        <div key={post.id} style={getStyles(post.layer).style}
        class={getStyles(post.layer).className}>
        <BlogPost key={post.id} post={post} />
        </div>
      ))}
    </Container>
  );
};

Zettelkasten.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Zettelkasten;
