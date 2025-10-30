"use client";

import { PrettyText } from '@/components/PrettyText';
import { useEffect, useState } from 'react';
import PostsCollection from './PostsCollection';

interface SearchParams {
  q?: string;
}

export default function PostsPageWrapper({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<SearchParams>;
}) {
  const [searchParams, setSearchParams] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchParamsPromise.then((params) => {
      setSearchParams(params.q);
      setIsLoading(false);
    });
  }, [searchParamsPromise]);

  if (isLoading) {
    return <PrettyText>Loading...</PrettyText>;
  }

  return <PostsCollection searchParams={searchParams||""} />;
}