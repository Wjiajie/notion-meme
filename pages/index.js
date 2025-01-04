import { clientConfig } from '@/lib/server/config'

import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { useConfig } from '@/lib/config'
import { generateRss } from '@/lib/rss'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  // 根据配置决定是否启用分页
  const enablePagination = clientConfig.enablePagination ?? true

  // 如果禁用分页，显示所有文章；否则只显示第一页
  const postsToShow = enablePagination
    ? posts.slice(0, clientConfig.postsPerPage)
    : posts

  const totalPosts = posts.length
  // 只在启用分页且有更多文章时显示分页
  const showNext = enablePagination && totalPosts > clientConfig.postsPerPage

  // 生成Feed订阅
  // todo: wjj
  const isShowFeed = true; // 使用useConfig获取配置
  if (isShowFeed) {
    generateRss(posts)
  }
  return {
    props: {
      page: 1,
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export default function Blog ({ postsToShow, page, showNext }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}
