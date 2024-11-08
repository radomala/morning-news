import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { addHiddenArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
//import backendUrl from '../modules/backendUrl';

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const hiddenArticle = useSelector((state) => state.hiddenArticles.value);

  // Vérifiez si l'article est caché
  const isArticleHidden = hiddenArticle.some(article => article.id === props.id);

  // Si l'article est caché, ne pas l'afficher
  if (isArticleHidden) {
    return null; // Ou un message comme <p>Article caché</p>
  }

  const handleHiddenArticle = () => {
    dispatch(addHiddenArticle(props));
  };

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3>{props.title}</h3>
        <FontAwesomeIcon
          onClick={handleBookmarkClick}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        <FontAwesomeIcon
          onClick={handleHiddenArticle}
          icon={faEyeSlash}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={314}
      />
      <p>{props.description}</p>
    </div>
  );
}

export default Article;
