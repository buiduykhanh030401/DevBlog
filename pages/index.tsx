import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useEffect, useMemo, useState } from "react";
import { BlogReview } from "../components/BlogReview";
import { getBlogs } from "../server/blogs"
import { BlogPost } from "../types/blog";

const Home: NextPage = ({
  blogData,
  tags
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
        return filterWord.every((filter) => blog.tags.includes(filter))
      })
      : blogData
  }, [filterWord])
  const filterLabel = (tag: any, index: number) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((id) => id !== index))
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIndex([...selectedIndex, index])
      setFilterWord([...filterWord, tag.innerText])
    }
  }
  useEffect(() => {
    console.log(filterWord);
  }, [selectedIndex])

  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-300 font-poppins">
      <title>Home Page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to Devblog</h1>
          <p> A fullstack blog with Next.js, TailwindCSS, Github GraphQL </p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, index: number) => {
            return (
              <button
                onClick={(e) => filterLabel(e.target, index)}
                className={`${selectedIndex.includes(index) ?
                  'label-selected hover:bg-sky-400 transition-all duration-300'
                  :
                  'label hover:bg-sky-400 transition-all duration-300'
                  }`}
                key={index}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div key={blog.id} className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-200 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300">
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogReview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                  lastEdited={blog.lastEdited}
                />
              </a>
            </div>
          )
        })}
      </section>
    </main >
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs();
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  console.log(tags);

  return {
    props: {
      blogData: blogs,
      tags: tags
    }
  }
}

export default Home;