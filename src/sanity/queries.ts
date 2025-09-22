export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
}`;