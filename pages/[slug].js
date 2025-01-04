import { clientConfig } from '@/lib/server/config'
import { getPageTableOfContents } from 'notion-utils'

import { useRouter } from 'next/router'
import cn from 'classnames'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { useLocale } from '@/lib/locale'
import { useConfig } from '@/lib/config'
import { createHash } from 'crypto'
import Container from '@/components/Container'
import Post from '@/components/Post'
import Comments from '@/components/Comments'

export default function BlogPost ({ post, blockMap, emailHash }) {
  const router = useRouter()
  const BLOG = useConfig()
  const locale = useLocale()

  const commentWidthClass = `max-w-${BLOG.commentWidth}`

  // TODO: It would be better to render something
  if (router.isFallback) return null

  const fullWidth = post.fullWidth ?? false

  // 获取目录内容
  const collectionId = Object.keys(blockMap.collection)[0]
  const page = Object.values(blockMap.block).find(block => block.value.parent_id === collectionId).value
  const nodes = getPageTableOfContents(page, blockMap)
  const hasTableOfContents = nodes.length > 0

  return (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      slug={post.slug}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <div className={cn(
        'flex flex-col px-4 md:px-6',
        'lg:max-w-7xl lg:mx-auto'
      )}>
        {/* 主要内容区域 */}
        <Post
          post={post}
          blockMap={blockMap}
          emailHash={emailHash}
          fullWidth={fullWidth}
        />

        {/* 右侧内容区域 */}
        <div className={cn(
          'flex-grow',
          commentWidthClass,
          hasTableOfContents ? 'lg:ml-[280px]' : 'mx-auto'
        )}>
          <div className="flex-grow">
            {/* Back and Top */}
            <div className="flex font-medium text-gray-500 dark:text-gray-400 mb-8">
              <a>
                <button
                  onClick={() => router.push(BLOG.path || '/')}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  ← {locale.POST.BACK}
                </button>
              </a>
            </div>

            {/* 评论区 */}
            <div className={cn(
              'bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden mb-8',
            )}>
              <div className="p-6">
                <Comments frontMatter={post} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: false })
  return {
    paths: posts.map(row => `${clientConfig.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  const posts = await getAllPosts({ includePages: true })
  const post = posts.find(t => t.slug === slug)

  if (!post) return { notFound: true }

  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5')
    .update(clientConfig.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}
