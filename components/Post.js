import PropTypes from 'prop-types'
import Image from 'next/image'
import cn from 'classnames'
import { useConfig } from '@/lib/config'
import useTheme from '@/lib/theme'
import FormattedDate from '@/components/FormattedDate'
import TagItem from '@/components/TagItem'
import NotionRenderer from '@/components/NotionRenderer'
import TableOfContents from '@/components/TableOfContents'

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

  return (
    <article
      className={cn(
        'flex-1 flex flex-col px-4 md:px-6',
        { 'lg:ml-[240px]': !fullWidth }
      )}
    >
      <div className={cn(
        'bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden',
        'mb-8',
        'w-full',
        fullWidth ? '' : 'max-w-4xl lg:max-w-5xl xl:max-w-6xl'
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
        <div className="self-stretch flex flex-col lg:flex-row lg:items-stretch relative">
          <div className={cn(
            'order-first lg:order-[unset] w-full lg:w-[240px] lg:fixed lg:left-0 lg:top-[65px] lg:bottom-0 lg:overflow-y-auto',
            'border-r border-gray-100 dark:border-gray-800'
          )}>
            <TableOfContents
              blockMap={blockMap}
              className="pt-3 px-4 md:px-6"
            />
          </div>

          <div className={cn(
            'flex-1 px-6 pb-6'
          )}>
            <NotionRenderer recordMap={blockMap} fullPage={false} darkMode={dark} />
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
