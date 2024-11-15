import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});
/*
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[4]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);
*/
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.articles[4]); // Vérifie cet index
            setArticles(data.articles.filter((_, index) => index > 0));
        })
        .catch((error) => {
            console.error("Erreur lors de l'appel à l'API :", error);
        });
}, []);


  const filteredArticles = articlesData.filter((data) => hiddenArticles.includes(data.title) === false);
  const articles = filteredArticles.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;