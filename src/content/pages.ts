import { answers, homeMeta } from '@/content/product';

export const siteOrigin = 'https://splitsmarter.app';

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  path: string;
  title: string;
  description: string;
  heading: string;
  lede: string;
  sections: ArticleSection[];
  faq?: boolean;
  guideHref?: string;
};

export const articles: Article[] = [
  {
    path: '/splitwise-alternative',
    title: 'Splitwise Alternative | Split Smarter',
    description:
      'Looking for a Splitwise alternative? Split Smarter splits bills by item, links bank records to expenses, and tracks trips and budgets. Start free.',
    heading: 'A Splitwise alternative that splits by item',
    lede: 'Split Smarter is free to start. The difference is how a bill, a bank line, and a settlement stay next to each other.',
    sections: [
      {
        heading: 'Split the bill by item',
        paragraphs: [
          'One person can pay for an item that several people share. Who paid is separate from who it was shared between. Net is what someone paid minus their share.',
        ],
      },
      {
        heading: 'The bank line stays next to the expense',
        paragraphs: [
          'A bank record can be linked to an expense. On the expense you manage the split and the amount. The bank record and the expense stay separate, and they stay in sync.',
          'The person who paid can link a bank transfer to the settlement. Paying someone back does not erase the dinner.',
        ],
      },
      {
        heading: 'Trips and shared budgets',
        paragraphs: [
          'A memory keeps a trip. Each charge stays in the country’s currency, and the total comes back in yours with live conversion. A shared budget follows the people on the expense.',
        ],
      },
    ],
  },
  {
    path: '/trip-expense-splitter',
    title: 'Trip Expense Splitter for Group Travel | Split Smarter',
    description:
      'Split trip costs in any currency, see spending on a map, and settle up when you are home. Split Smarter keeps every charge of a group trip in one place.',
    heading: 'A trip expense splitter for group travel',
    lede: 'Keep every charge of a group trip in one memory, then settle up when you are home.',
    sections: [
      {
        heading: 'Each charge keeps its currency',
        paragraphs: [
          'A memory keeps the trip. You see how it was spent, each charge in the country’s currency, and the total in yours with live conversion rates. Split Smarter supports 156 currencies.',
        ],
      },
      {
        heading: 'The map is the trail',
        paragraphs: [
          'The map joins the places in the order you visited. The same spend breaks down by time, category, people, and what is still open.',
        ],
      },
      {
        heading: 'Settle when the trip is over',
        paragraphs: [
          'Who paid is separate from who the expense was shared between. A transfer sits beside the expense, so settling up does not erase the trip.',
        ],
      },
    ],
  },
  {
    path: '/roommates',
    title: 'Split Rent & Bills with Roommates | Split Smarter',
    description:
      'Share rent, groceries and utilities with flatmates. Split Smarter tracks who paid, splits by item, and sets shared budgets so nobody overspends.',
    heading: 'Split rent and bills with roommates',
    lede: 'Rent, groceries, and the other bills you share stay as expenses. Who paid is not the same as who they were shared between.',
    sections: [
      {
        heading: 'Who paid, and who it was shared between',
        paragraphs: [
          'One person can pay the rent or the grocery run. The people who share it each take their part. Net is what someone paid minus their share.',
        ],
      },
      {
        heading: 'Split by item',
        paragraphs: [
          'A receipt can hold more than one type. Groceries and produce can both sit under Food. A budget on Food covers both. A budget on Groceries covers only that type.',
        ],
      },
      {
        heading: 'A shared budget',
        paragraphs: [
          'A shared budget follows the people on the expense. A soft cap warns. A hard cap can refuse a new expense.',
        ],
      },
    ],
  },
  {
    path: '/pricing',
    title: "Split Smarter Pricing: It's Free",
    description: 'Item splits, shared budgets, and trip tracking are free to start.',
    heading: 'Split Smarter is free to start',
    lede: 'Item splits, shared budgets, and trip tracking are free to start. There is no paid plan to compare.',
    sections: [
      {
        heading: 'What is included',
        paragraphs: [
          'Split a bill by item, keep a budget, and follow a trip as a trail. Bank records stay linked to expenses, and a settlement stays beside the dinner it paid for.',
        ],
      },
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy | Split Smarter',
    description:
      'You have full control over your data and visibility. You decide who can find you and invite you.',
    heading: 'Your data and visibility',
    lede: 'You have full control over your data and visibility. You can decide who can find you and invite you.',
    guideHref: '/guide/en/account/howto-manage-profile-visibility',
    sections: [
      {
        heading: 'Who can find you',
        paragraphs: [
          'Profile visibility decides who can find you and invite you. The guide walks through that setting.',
          'Questions about your data go to support@splitsmarter.app.',
        ],
      },
    ],
  },
  {
    path: '/terms',
    title: 'Terms | Split Smarter',
    description: 'Split Smarter is free to start. These terms cover use of the site and the app.',
    heading: 'Terms of use',
    lede: 'Split Smarter is free to start. These terms cover use of the site and the app.',
    sections: [
      {
        heading: 'The service',
        paragraphs: [
          'Split Smarter tracks expenses, splits, budgets, and trips. Item splits, shared budgets, and trip tracking are free to start.',
        ],
      },
      {
        heading: 'Your account',
        paragraphs: [
          'You decide who can find you and invite you. You can ask support@splitsmarter.app about your data and visibility.',
        ],
      },
    ],
  },
  {
    path: '/faq',
    title: 'FAQ | Split Smarter',
    description:
      'How bank records, splits, budgets, merchants, trips, and analytics work in Split Smarter.',
    heading: 'Questions about Split Smarter',
    lede: 'The same answers as on the homepage, each one still in the page.',
    faq: true,
    sections: [],
  },
];

export type PageHead = {
  path: string;
  title: string;
  description: string;
  marker: string;
  jsonLd: string;
};

function webPage(title: string, description: string, path: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteOrigin}${path}`,
  });
}

function faqPage() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answers.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

export const pageHeads: PageHead[] = [
  {
    path: '/',
    title: homeMeta.title,
    description: homeMeta.description,
    marker: 'Split bills and track every expense',
    jsonLd: '',
  },
  ...articles.map((article) => ({
    path: article.path,
    title: article.title,
    description: article.description,
    marker: article.heading,
    jsonLd: article.faq
      ? faqPage()
      : webPage(article.title, article.description, article.path),
  })),
];
