import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import EditorTag from '../components/tag/EditorTag';
import Loading from '../components/common/Loading';
import { putArticle, getArticle } from '../api/article';
import { isLoggedInAtom, userAtom } from '../atom';

interface EditorProps {
  title: string;
  description: string;
  body: string;
  tag: string;
  tagList: string[];
}

const EditArticle = () => {
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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { URLSlug } = useParams();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const user = useRecoilValue(userAtom);

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

  const publishArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await putArticle(URLSlug!, {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        },
      });
      navigate(`/article/${data.article.slug}`);
    } catch (err: any) {
      if (err.response.status === 422) {
        const errorMessage = err.response.data.errors;
        setError({
          title: errorMessage.title,
          description: errorMessage.description,
          body: errorMessage.body,
        });
      }
    }
    setDisabled(false);
  };

  useEffect(() => {
    const initArticle = async () => {
      try {
        const { article } = await getArticle(URLSlug!);
        if (!isLoggedIn || article.author.username !== user.username) {
          navigate('/', { replace: true });
        }
        setEditor({
          title: article.title,
          description: article.description,
          body: article.body,
          tag: '',
          tagList: article.tagList,
        });
      } catch (e: any) {
        navigate('/', { replace: true });
      }
      setLoading(false);
    };

    initArticle();
  }, [URLSlug, isLoggedIn, navigate, user.username]);

  if (loading) return <Loading height={75} />;

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

export default EditArticle;
