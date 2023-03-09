import {getAllPostIds, getPostData} from "../../../lib/posts";
import Date from '../../components/date';

export default function Post({postData}:any) {
    return <div>
        {postData.title}
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
}

// 动态路由
export async function getStaticPaths() {
 const paths = getAllPostIds();
 return {
     paths,
     fallback:false // false 如果没有路径匹配 返回404
                    // true
 }
}

export async function getStaticProps({params}:any) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}
