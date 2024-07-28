import Zettelkasten from '@/components/Zettelkasten'
import { getAllPosts } from '@/lib/notion'

export default function zettelkasten ({ posts }) {
  return <Zettelkasten posts={posts} />
}

export async function getStaticProps() {
  // 假设getAllPosts是一个获取所有posts的异步函数
  const posts = await getAllPosts({ includePages: true })
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

