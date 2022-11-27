import { GetServerSideProps, NextPage } from 'next'
import { getBlogDetail } from '../../server/blogs';
import { BlogDetail } from '../../types/blog';

const BlogPost: NextPage = () => {
    return (
        <div>
            <h1> blogPost </h1>
        </div>
    )
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const route: string[] | string | undefined = context.query.id;
    console.log(route);
    let blogDetail = await getBlogDetail(1)
    return (
        props: {
            blogData: BlogDetail
        }
    )
}