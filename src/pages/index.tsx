import {getSortedPostsData} from "../../lib/posts";
import Date from '../components/date';
import Link from 'next/link';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({allPostsData}:any) {
  return (
    <>
      <div>
        <section>
          <h2>Blog</h2>
          <ul>
            {allPostsData?.map(({id,date,title}:any) => {
              return (
                  <li key={id}>
                    <Link href={`/posts/${id}`}>{title}</Link>
                    <br/>
                    {id}
                    <br/>
                    <Date dateString={date} />
                  </li>
              )
            })}
          </ul>
        </section>
      </div>
    </>
  )
}
