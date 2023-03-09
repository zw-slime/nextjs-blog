import path from "path";
import * as fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(),'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData:{[p: string]: any} = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/,'');

        const fullPath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a:any,b:any) => {
        if(a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    })
}


export async function getPostData(id:string) {
    const fullPath = path.join(postsDirectory,`${id}.md`);

    const fileContents = fs.readFileSync(fullPath,'utf8');

    const matterResult = matter(fileContents);

    const contentHtml = await remark().use(html).process(matterResult.content)

    return {
        id,
        contentHtml:contentHtml.toString(),
        ...matterResult.data
    }
}
