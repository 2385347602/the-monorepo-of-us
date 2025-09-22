import Link from 'next/link';
import { client } from '@/sanity/client';
import { POSTS_QUERY } from '@/sanity/queries';

export default async function BlogIndex() {
    const posts = await client.fetch(POSTS_QUERY);

    return (
        <main>
            <h1>Latest Posts</h1>
            <ul>
                {posts.map((post: any) => (
                    <li key={post._id}>
                        <Link href={`/blog/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}