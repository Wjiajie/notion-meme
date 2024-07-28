import Link from 'next/link';
import { useConfig } from '@/lib/config';
import FormattedDate from '@/components/FormattedDate';

const ZettelkastenPost = ({ post }) => {
  const BLOG = useConfig();

  // 判断 post 类型是否为 Zpage
  const isZpage = post.type && post.type.includes("Zpage");

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      {isZpage && (
        <>
        <article key={post.id}>
          <header className="flex flex-col justify-between md:flex-row md:items-baseline"></header>
          {post.title}
        </article>
        </>
      )}

      {!isZpage && (
        <>
        <article key={post.id} className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            <FormattedDate date={post.date} />
          </time>
          <main>
            <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
              {post.summary}
            </p>
          </main>
        </article>
        </>
      )}
    </Link>
  )
}

export default ZettelkastenPost;
