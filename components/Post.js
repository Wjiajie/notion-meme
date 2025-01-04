import PropTypes from 'prop-types'
import Image from 'next/image'
import cn from 'classnames'
import { useConfig } from '@/lib/config'
import useTheme from '@/lib/theme'
import FormattedDate from '@/components/FormattedDate'
import TagItem from '@/components/TagItem'
import NotionRenderer from '@/components/NotionRenderer'
import TableOfContents from '@/components/TableOfContents'
import { getPageTableOfContents } from 'notion-utils'

/**
 * A post renderer
 *
 * @param {PostProps} props
 *
 * @typedef {object} PostProps
 * @prop {object}   post       - Post metadata
 * @prop {object}   blockMap   - Post block data
 * @prop {string}   emailHash  - Author email hash (for Gravatar)
 * @prop {boolean} [fullWidth] - Whether in full-width mode
 */
export default function Post (props) {
  const BLOG = useConfig()
  const { post, blockMap, emailHash, fullWidth = false } = props
  const { dark } = useTheme()

  const articleWidthClass = `max-w-${BLOG.articleWidth}`

  // 获取目录内容
  const collectionId = Object.keys(blockMap.collection)[0]
  const page = Object.values(blockMap.block).find(block => block.value.parent_id === collectionId).value
  const nodes = getPageTableOfContents(page, blockMap)
  const hasTableOfContents = nodes.length > 0

  return (
    <article className="flex-1 flex flex-col">
      <div className={cn(
        'w-full',
        'relative'
      )}>
        {/* 只在有目录内容时显示目录 */}
        {hasTableOfContents && (
          <div className={cn(
            'order-first lg:w-[240px] flex-shrink-0',
            'block',
            'mb-6 lg:mb-0',
            'lg:fixed',
            'lg:top-[100px]',
            'lg:h-[calc(100vh-100px)]',
            'lg:overflow-y-auto'
          )}>
            <TableOfContents
              blockMap={blockMap}
              className="lg:pr-4 px-6 lg:px-0"
            />
          </div>
        )}

        <div className={cn(
          'flex-grow',
          articleWidthClass,
          hasTableOfContents ? 'lg:ml-[280px]' : 'mx-auto',
          'mt-0'
        )}>
          <div className={cn(
            'bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden',
            'mb-8',
            'w-full'
          )}>
            <h1 className={cn(
              'w-full font-bold text-3xl text-black dark:text-white px-6 pt-6'
            )}>
              {post.title}
            </h1>
            {post.type[0] !== 'Page' && (
              <nav className={cn(
                'w-full flex mt-7 items-start text-gray-500 dark:text-gray-400 px-6'
              )}>
                <div className="flex mb-4">
                  <a href={BLOG.socialLink || '#'} className="flex">
                    <Image
                      alt={BLOG.author}
                      width={24}
                      height={24}
                      src={`https://gravatar.com/avatar/${emailHash}`}
                      className="rounded-full"
                    />
                    <p className="ml-2 md:block">{BLOG.author}</p>
                  </a>
                  <span className="block">&nbsp;/&nbsp;</span>
                </div>
                <div className="mr-2 mb-4 md:ml-0">
                  <FormattedDate date={post.date} />
                </div>
                {post.tags && (
                  <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                    {post.tags.map(tag => (
                      <TagItem key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </nav>
            )}
            <div className="px-6 pb-6">
              <NotionRenderer recordMap={blockMap} fullPage={false} darkMode={dark} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired,
  emailHash: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool
}
