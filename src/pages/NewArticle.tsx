import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import EditorTag from '../components/tag/EditorTag';
import { postArticle } from '../api/article';
import { isLoggedInAtom } from '../atom';

interface EditorProps {
  title: string;
  description: string;
  body: string;
  tag: string;
  tagList: string[];
}

const NewArticle = () => {
  const [editor, setEditor] = useState<EditorProps>({
    title: '',
    description: '',
    body: '',
    tag: '',
    tagList: [],
  });
  const { title, description, body, tag, tagList } = editor;
  const [error, setError] = useState({
    title: '',
    description: '',
    body: '',
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditor({
      ...editor,
      [name]: value,
    });
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!tagList.includes(tag)) {
        addTag(tag);
      }
    }
  };

  const addTag = (newTag: string) => {
    setEditor({
      ...editor,
      tag: '',
      tagList: [...tagList, newTag],
    });
  };

  const removeTag = (target: string) => {
    setEditor({ ...editor, tagList: tagList.filter(tag => tag !== target) });
  };

  const publishArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const { article } = await postArticle({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        },
      });
      navigate(`/article/${article.slug}`);
    } catch (e: any) {
      if (e.response.status === 422) {
        const errorMessage = e.response.data.errors;
        setError({
          title: errorMessage.title,
          description: errorMessage.description,
          body: errorMessage.body,
        });
      } else {
        setError({
          title: '',
          description: '',
          body: '',
        });
      }
    }
    setDisabled(false);
  };

  if (!isLoggedIn) navigate('/', { replace: true });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Editor — Conduit</title>
        </Helmet>
      </HelmetProvider>

      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                {error.title && <li>title {error.title}</li>}
                {error.description && <li>description can't be blank</li>}
                {error.body && <li>body can't be blank</li>}
              </ul>

              <form onSubmit={event => publishArticle(event)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      value={title}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      value={description}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      name="body"
                      value={body}
                      onChange={onChange}
                      disabled={disabled}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      name="tag"
                      value={tag}
                      onChange={onChange}
                      onKeyDown={onEnter}
                      disabled={disabled}
                    />
                    <div className="tag-list"></div>
                  </fieldset>

                  <div>
                    {tagList.map(tag => (
                      <EditorTag
                        key={tag}
                        name={tag}
                        onClick={() => removeTag(tag)}
                      />
                    ))}
                  </div>

                  <button className="btn btn-lg pull-xs-right btn-primary">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArticle;
