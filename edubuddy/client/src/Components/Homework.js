import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const HomeworkPage = () => {
  const [homeworkText, setHomeworkText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleEditorChange = (content, editor) => {
    setHomeworkText(content);
  };

  const handleSubmit = () => {
    // Perform submission logic, like sending to a backend server
    // For now, we'll just set the submitted state to true
    setSubmitted(true);
    // And set some static feedback
    setFeedback('Remember to use proper capitalization and punctuation.');
  };

  return (
    <div className="MySchedule">
      <h1>Homework: Creative Writing</h1>
      <p>Due tomorrow, Nov 5, 2023</p>
      <div>
        <h2>Description</h2>
        <p>
          Creative Writing - Imagine you find a magic lamp with a genie inside who grants you three wishes. Write
          a story describing your three wishes and how they come true. Your story should be at least 5
          paragraphs.
        </p>
      </div>
      <div className="editor-spacing">
        <h2>Submission</h2>
        <Editor
            apiKey = "jdek6n7e8ne3sfx6av48m0vti944h59kzubnndzzch2ongts"
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
        <button className="button-spacing" onClick={handleSubmit}>Submit</button>
      </div>
      {submitted && (
        <div>
          <h2>Correction for Your Homework</h2>
          <div>Feedback: {feedback}</div>
          <div>
            <h3>Corrected Version</h3>
            {/* Render corrected version of the text here - backend prompted eng */}
            <div dangerouslySetInnerHTML={{ __html: homeworkText }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkPage;
