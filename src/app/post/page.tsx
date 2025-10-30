import { Suspense } from 'react'
import PostsPageWrapper from './PostsPageWrapper'
import { PrettyText } from '@/components/PrettyText'

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  return (
    <Suspense fallback={<PrettyText>Loading...</PrettyText>}>
      <PostsPageWrapper searchParamsPromise={searchParams} />
    </Suspense>
  )
}