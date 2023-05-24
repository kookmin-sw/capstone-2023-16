import {createElement, Fragment, useEffect, useState} from 'react'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'

function useProcessor(text:string) {
  const [Content, setContent] = useState<any>(Fragment)

  useEffect(() => {
    unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypeReact, {createElement, Fragment})
      .process(text)
      .then((file) => {
        setContent(file.result)
      })
      console.log(text);
    }, [text])

  return Content
}

export default function HTMLViewer({text}: {text:string}) {
  return useProcessor(text);
}