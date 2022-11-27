export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
        viewer {
          login
          avatarUrl
        }
        repository(name: "DevBlog", owner: "buiduykhanh030401") {
          discussions(first: 100, categoryId: "${ghDiscussionCategoryId}") {
            nodes {
              title
              url
              number
              bodyHTML
              bodyText
              createdAt
              lastEditedAt
              author {
                login
                url
                avatarUrl
              }
              labels(first:100) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }`
}

// Single post
export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(name: "DevBlog", owner: "buiduykhanh030401") {
      discussions(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}
