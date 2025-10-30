import { getNewsPosts } from "@/services/getPosts";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";

export const useNewsPosts = (): Post[] | null => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    useEffect(() => {
        let isMounted = true;

        async function loadPosts() {
            try {
                const data = await getNewsPosts();
                if (isMounted) setPosts(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadPosts();

        return () => {
            isMounted = false;
        }
    }, []);

    return posts;
};
