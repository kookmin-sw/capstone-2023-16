import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import textpatterns from './properties/textpattern';
import { useDispatch } from 'react-redux';
import { partialChange } from '../../redux/slices/newPostSlice';
import codesample_languages from './properties/codesample_languages';
import './properties/font.css';
const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

type TextEditorProps = {
  submitFlag: boolean,
}

const TextEditor = ({submitFlag}:TextEditorProps) => {
  const editorRef = useRef<any>(null);                      // editorRef 객체로, editorRef.current.getContent()로 내용을 가져올 수 있음.
  const dispatch = useDispatch();

  useEffect(() => { 
    if (submitFlag && editorRef.current) {
      const htmlValue = editorRef.current.getContent({ format: 'html' });
      const textValue = editorRef.current.getContent({ format: 'text' });
      dispatch(partialChange({ key: 'content', value: htmlValue }));
      dispatch(partialChange({ key: 'length', value: textValue.length }));
      if (textValue.length===0 || textValue.length < 20) alert("내용은 20자 이상입력해야합니다.");
    }
  }, [submitFlag])
    

  const handlerImageuUpload = (blobInfo: any, progress: (percent: number) => void): Promise<string> => {
    // 추후에 s3로 전송?
    //setFormData(formData => { formData.append('file', blobInfo.blob(), blobInfo.filename()); return formData; });
    return new Promise<string>(res => setTimeout(() => {
      res(blobInfo);
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
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'codesample', 'fullscreen', 'emoticons',
          'insertdatetime', 'media', 'save', 'visualchars', 'quickbars', 'print', 'autosave'
        ],
        toolbar1: 'undo redo blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify lineheight| link emoticons blockquote codesample image |',
        toolbar2: 'bullist numlist | outdent indent | fullscreen restoredraft save print | help',
        toolbar_mode: 'wrap',
        save_onsavecallback: () => {
          console.log('Saved');
        },
        block_formats: 'Paragraph=p; 제목=h1; 부제목=h2; 본문1=h3; 본문2=h4; 본문3=h5;',
        file_picker_types: 'image media',
        images_file_types: 'jpg, gif, png, svg, webp',
        image_caption: true,
        codesample_content_css: "http://ourcodeworld.com/material/css/prism.css",
        link_default_target: '_blank',
        codesample_languages: codesample_languages,
        a11y_advanced_options: true,
        language: 'ko_KR',
        textpattern_patterns: textpatterns, 
        block_unsupported_drop: false,
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic forecolor backcolor | quicklink blockquote',
        quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',  
        content_style: "@import url(//fonts.googleapis.com/earlyaccess/nanummyeongjo.css);",
        content_css: 'default',
        menubar: 'edit format',
        statusbar: false,
        automatic_uploads: true,
        images_upload_handler: handlerImageuUpload,
        font_css: 'font.css',
        font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; 나눔명조=Nanum Myeongjo; serif=Noto Serif KR',
        /*
         임시저장 기능 good, but 나중에 회원정보를 식별하여 받아올 수 있게 되면 구현
        autosave_interval: '30s', // 30초마다 임시저장, 로컬 스토리지에 tinymce-autosave-/post/edit/{postId}-tiny-react_{id}-draft 로 저장됨.
        autosave_restore_when_empty: true,
        */
      }}
      /* 
      내용이 바뀔때마다 호출되는 핸들러 속성
      첫번째 인자에는 HTML 구문이, 두번째 인자의 getContent({format: string})를 통해 html, text 등의 포맷형식 지정 추출 가능
      onEditorChange={(htmlContent, content) => { console.log(htmlContent) }}
      */
      />
  </>
};

export default TextEditor;