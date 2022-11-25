import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";

import EditorTag from "../components/tag/EditorTag";
import { putArticles, getArticles } from "../api/article";
import { menuState } from "../state";

interface EditorProps {
  title: string;
  description: string;
  body: string;
  tag: string;
  tagList: string[];
}

const EditArticle = () => {
  const [editor, setEditor] = useState<EditorProps>({
    title: "",
    description: "",
    body: "",
    tag: "",
    tagList: [],
  });
  const { title, description, body, tag, tagList } = editor;
  const [error, setError] = useState({
    title: "",
    description: "",
    body: "",
  });
  const [disabled, setDisabled] = useState(false);

  const setMenu = useSetRecoilState(menuState);
  const navigate = useNavigate();
  const { URLSlug } = useParams();

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
    if (event.key === "Enter") {
      event.preventDefault();
      if (!tagList.includes(tag)) {
        addTag(tag);
      }
    }
  };

  const addTag = (newTag: string) => {
    setEditor({
      ...editor,
      tag: "",
      tagList: [...tagList, newTag],
    });
  };

  const removeTag = (target: string) => {
    setEditor({ ...editor, tagList: tagList.filter((tag) => tag !== target) });
  };

  const publishArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await putArticles(`/articles/${URLSlug}`, {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        },
      });
      navigate(`/article/${data.article.slug}`);
    } catch (error: any) {
      if (error.response.status === 422) {
        const errorMessage = error.response.data.errors;
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
      const data = await getArticles(`articles/${URLSlug}`);
      setEditor({
        title: data.article.title,
        description: data.article.description,
        body: data.article.body,
        tag: "",
        tagList: data.article.tagList,
      });
    };
    initArticle();
  }, [URLSlug]);

  useEffect(() => {
    setMenu(3);
  }, [setMenu]);

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
              <form onSubmit={(event) => publishArticle(event)}>
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
                    {tagList.map((tag) => (
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
