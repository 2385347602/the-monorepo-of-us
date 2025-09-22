import {client} from '@/sanity/client';
import {PortableText} from '@portabletext/react';

import Image from 'next/image';
import urlFor from '@/sanity/urlFor'; // A helper function to build image URLs

const ptComponents = {
    types: {
        image: ({value}: { value: any }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <Image
                    src={urlFor(value).url()}
                    alt={value.alt || ' '}
                    width={800}
                    height={400}
                    className="my-4"
                    loading="lazy"
                />
            );
        },
    },
};

const POST_QUERY = `*[_type == "post" && slug.current == $slug] {
  title,
  mainImage,
  body
}`;


export default async function PostPage({params}: { params: { slug: string } }) {
    const post = await client.fetch(POST_QUERY, {slug: params.slug});
    if (!post) {
        // Handle post not found
        return <div>Post not found</div>;
    }
    return (
        <article>
            <h1>{post.title}</h1>
            <PortableText value={post.body} components={ptComponents}/>
        </article>
    );
}
