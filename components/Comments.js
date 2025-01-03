import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import { useEffect } from 'react'

const Comments = () => {
  const router = useRouter()

  useEffect(() => {
    // 如果不是 utterances 评论，直接返回
    if (BLOG.comment.provider !== 'utterances') {
      return
    }

    // 加载 utterances
    const script = document.createElement('script')
    const config = BLOG.comment.utterancesConfig

    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', config.repo)
    script.setAttribute('issue-term', config.issueTerm || 'pathname')
    script.setAttribute('theme', config.theme || 'preferred-color-scheme')

    // 清除旧的评论区
    const comments = document.getElementById('comments')
    if (comments) {
      while (comments.firstChild) {
        comments.removeChild(comments.firstChild)
      }
      comments.appendChild(script)
    }

    // 清理函数
    return () => {
      const comments = document.getElementById('comments')
      if (comments) {
        while (comments.firstChild) {
          comments.removeChild(comments.firstChild)
        }
      }
    }
  }, [router.asPath]) // 当路由变化时重新加载评论

  // 如果没有配置评论系统，直接返回 null
  if (!BLOG.comment.provider) {
    return null
  }

  return (
    <div
      id="comments"
      className="px-4 font-medium text-gray-500 dark:text-gray-400 my-5 mx-auto max-w-2xl"
    />
  )
}

export default Comments
