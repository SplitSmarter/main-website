import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import type { Article } from '@/content/pages';
import { articles } from '@/content/pages';
import { Answers } from '../components/Answers';
import { GetStartedLink } from '../components/GetStartedLink';
import { NotifyDialog } from '../components/NotifyDialog';
import { SiteClose } from '../components/SiteClose';
import { StartNav } from '../components/StartNav';
import { usePageMeta } from '../usePageMeta';
import styles from '../StartPage.module.css';

const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&display=swap';

function ensureFonts() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('start-screen-fonts')) return;
  const link = document.createElement('link');
  link.id = 'start-screen-fonts';
  link.rel = 'stylesheet';
  link.href = FONT_STYLESHEET;
  document.head.append(link);
}

ensureFonts();

type ArticlePageProps = {
  article: Article;
};

export function ArticlePage({ article }: ArticlePageProps) {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const openNotify = () => setNotifyOpen(true);
  const closeNotify = useCallback(() => setNotifyOpen(false), []);
  usePageMeta(article.title, article.description, article.path);

  return (
    <main className={styles.page}>
      <div className={styles.ground} aria-hidden />
      <div className={styles.surface}>
        <div className={styles.frame}>
          <StartNav onGetStarted={openNotify} />
          <article className={styles.article}>
            <h1>{article.heading}</h1>
            <p>{article.lede}</p>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            {article.faq ? <Answers /> : null}
            {article.guideHref ? (
              <p>
                <a href={article.guideHref}>Who can find you</a>
              </p>
            ) : null}
            <GetStartedLink className={styles.cta} onGetStarted={openNotify}>
              Get started
            </GetStartedLink>
            <nav className={styles.articleLinks} aria-label="More pages">
              {articles
                .filter((item) => item.path !== article.path)
                .map((item) => (
                  <Link key={item.path} to={item.path}>{item.heading}</Link>
                ))}
            </nav>
          </article>
        </div>
        <div className={styles.below}>
          <SiteClose onGetStarted={openNotify} />
        </div>
      </div>
      <NotifyDialog open={notifyOpen} onClose={closeNotify} />
    </main>
  );
}
