import React from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { animated } from 'react-spring/renderprops';
import postlist from '../data/posts.json';
import styles from './Blog.module.css';
const readingTime = require('reading-time');

const PostList = ({ style, mouseEnter, mouseLeave }) => {
  const excerptList = postlist.map(post => {
    return (
      post.content
        .split(' ')
        .slice(0, 20)
        .join(' ') + '...'
    );
  });

  return (
    <animated.section style={style} className={styles.posts_wrapper}>
      <div className={styles.posts}>
        {postlist.length &&
          postlist.map((post, i) => {
            let time = Math.floor(readingTime(post.content).minutes);
            return (
              <div key={i} className={styles.post}>
                <div>
                  <h2 className={styles.post_title}>{post.title}.</h2>
                  <p>{post.date}</p>
                </div>
                <div className={styles.post_excerpt}>
                  <Markdown source={excerptList[i]} escapeHtml={false} />
                </div>
                <div className={styles.post_tags}>
                  {post.tags.map(tag => {
                    return <p className={styles.post_tag}>{tag}</p>;
                  })}
                </div>
                <div className={styles.post_details}>
                  <div>
                    <p className={styles.post_reading_time}>
                      Reading Time ~{' '}
                      {time === 1 ? `${time} min` : `${time} mins`}.
                    </p>
                  </div>

                  <div>
                    <Link
                      className={styles.post_link}
                      to={`/post/${post.slug}`}
                      onMouseEnter={mouseEnter}
                      onMouseLeave={mouseLeave}
                    >
                      Start Reading
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </animated.section>
  );
};

export default PostList;