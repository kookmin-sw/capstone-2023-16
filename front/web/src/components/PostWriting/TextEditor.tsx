import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import textpatterns from './properties/textpattern';
import { useDispatch } from 'react-redux';
import { partialChange } from '../../redux/slices/newPostSlice';

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

type TextEditorProps = {
  submitFlag: boolean,
}

const TextEditor = ({submitFlag}:TextEditorProps) => {
  const editorRef = useRef<any>(null);                      // editorRef 객체로, editorRef.current.getContent()로 내용을 가져올 수 있음.
  const dispatch = useDispatch();

  useEffect(() => { 
    if (submitFlag&&editorRef.current) {
      dispatch(partialChange({key: 'content', value: editorRef.current.getContent({format: 'text'})}));
    }
  }, [submitFlag])
    

  const handlerImageuUpload = (blobInfo: any, progress: (percent: number) => void): Promise<string> => {
    // 추후에 s3로 전송?
    //setFormData(formData => { formData.append('file', blobInfo.blob(), blobInfo.filename()); return formData; });
    return new Promise<string>(res => setTimeout(() => {
      res('hi!');
    }, 200));
  };

  return <>
    <Editor
      apiKey={TINYMCE_API_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      init={{
        deprecation_warnings: false,
        width: '100%',
        height: 700,
        plugins: ['anchor autolink charmap preview textpattern codesample emoticons image imagetools link lists searchreplace checklist casechange export formatpainter pageembed linkchecker permanentpen powerpaste quickbars'],
        // 추후에 추가할 plugins:  autosave
        toolbar: ['undo redo | blocks formatselect forecolor fontsizeselect | bold italic underline strikethrough | link image | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | preview removeformat'],
        language: 'ko_KR',
        textpattern_patterns: textpatterns, 
        block_unsupported_drop: false,
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic | formatselect | quicklink blockquote',
        quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',  
        content_style: 'body { font-family:"Noto Sans KR", serif; font-size:24px }',
        menubar: 'edit format',
        statusbar: false,
        images_upload_handler: handlerImageuUpload,
        font_css: './properies/font_css.css',
        /*
         임시저장 기능 good, but 나중에 회원정보를 식별하여 받아올 수 있게 되면 구현
        autosave_interval: '30s', // 30초마다 임시저장, 로컬 스토리지에 tinymce-autosave-/post/edit/{postId}-tiny-react_{id}-draft 로 저장됨.
        autosave_restore_when_empty: true,
        */
      }}
      /* 
      내용이 바뀔때마다 호출되는 핸들러 속성
      첫번째 인자에는 HTML 구문이, 두번째 인자의 getContent({format: string})를 통해 html, text 등의 포맷형식 지정 추출 가능
      */
      onEditorChange={(htmlContent, content) => { console.log(htmlContent) }}
    />
    <button>Log editor content</button>
  </>
};

export default TextEditor;