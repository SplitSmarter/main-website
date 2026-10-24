export const brand = 'Split Smarter';

export const previewNav = [
  { label: 'Wallet', href: '#ledger' },
  { label: 'Groups', href: '#groups' },
  { label: 'Places', href: '#places' },
  { label: 'Budgets', href: '#budget' },
] as const;

export const startNav = [
  { label: 'Add', href: '#capture' },
  { label: 'Ledger', href: '#ledger' },
  { label: 'Debt', href: '#debt' },
  { label: 'Budget', href: '#budget' },
  { label: 'Trail', href: '#trail' },
  { label: 'Map', href: '#map' },
] as const;

export const getStarted = {
  title: 'Get started',
  headline: 'Split every expense.',
  lede: 'Who paid an expense is not who shares it. The difference is what each person is owed.',
  cta: 'Get started',
};

export const proof = [
  { value: '4', label: 'Languages supported', icon: 'language' as const },
  { value: '156', label: 'Currencies supported', icon: 'currency' as const },
  { value: '5.0', label: 'Rated', icon: 'review' as const },
];

export const problemScenes = {
  capture: {
    id: 'capture',
    title: 'A bill, a note, or your voice.',
    body: 'Add a photo of the bill, a written note, or a note you dictate. A photo and a note can go together. The expense is filled in for you to review, then save.',
    heading: 'Scan receipt',
    hint: 'Dictate a note, add a photo, or both.',
    note: 'Dinner for four at Cafe Lumen',
    photos: 'Photos',
    bill: 'Bill',
    camera: 'Camera',
    library: 'Library',
    action: 'Scan',
    scanning: 'Scanning…',
    review: 'Review',
    saved: 'Saved',
    loggedTitle: 'Cafe Lumen',
    loggedDetail: 'Food',
    loggedPlace: 'Harbor',
    loggedAmount: '€18.40',
  },
  ledger: {
    id: 'ledger',
    sample: 'Sample',
    title: 'Who paid is not the share.',
    body: 'Split by item. One item can be shared between several people. Net is what someone paid minus their share.',
    paid: 'Maya · $186.20',
    items: [
      {
        title: 'Sea bass',
        amount: '$64.00',
        icon: 'dish' as const,
        shared: [
          { person: 'Maya', initial: 'M' },
          { person: 'You', initial: 'Y' },
        ],
      },
      {
        title: 'Wine',
        amount: '$40.00',
        icon: 'glass' as const,
        shared: [
          { person: 'Jonah', initial: 'J' },
          { person: 'Priya', initial: 'P' },
        ],
      },
    ],
  },
  debt: {
    id: 'debt',
    title: 'A payment does not erase the bill.',
    body: 'Spending stays on the expense. A transfer is from one person or merchant to another. The two stay side by side, so the cost and the movement are easy to tell apart.',
    expense: {
      kind: 'Spend',
      title: 'Saturday dinner',
      amount: '$186.20',
      shared: [
        { person: 'Maya', initial: 'M' },
        { person: 'You', initial: 'Y' },
        { person: 'Jonah', initial: 'J' },
        { person: 'Priya', initial: 'P' },
      ],
    },
    transfer: { kind: 'Transfer', title: 'You to Maya', detail: 'Person to person', amount: '$46.55' },
  },
  receipt: {
    id: 'receipt',
    sample: 'Sample',
    title: 'One receipt, more than one category.',
    body: 'Each line keeps its own category, nested under a parent. A parent also covers the categories beneath it.',
    groups: [
      {
        parent: 'Food',
        lines: [
          { title: 'Groceries', amount: '$42.10', icon: 'basket' as const },
          { title: 'Produce', amount: '$12.00', icon: 'basket' as const },
        ],
      },
      {
        parent: 'Home',
        lines: [
          { title: 'Household', amount: '$18.40', icon: 'home' as const },
        ],
      },
    ],
    total: { label: 'Total', amount: '$72.50' },
  },
  merchants: {
    id: 'merchants',
    title: 'The same shop, every visit.',
    body: 'Search a large merchant catalog, or add your own. Spend at one merchant stays together, and a branch is the place that payment went.',
    rows: [
      { name: 'Mercado da Ribeira', branch: 'Downtown', amount: '$86.00' },
      { name: 'Cafe Lumen', branch: 'Harbor', amount: '$18.40' },
      { name: 'Alfama rooms', branch: 'Alfama', amount: '$420.00' },
    ],
  },
  budget: {
    id: 'budget',
    title: 'The cap follows the share.',
    body: 'A soft cap warns. It can be just you, shared with other people, or a whole group, and it can watch categories, places, merchants, and memories together. A hard cap can refuse a new expense.',
    name: 'Groceries',
    strength: 'Soft',
    who: 'Shared',
    level: '80%',
    people: [
      { person: 'Maya', initial: 'M' },
      { person: 'You', initial: 'Y' },
    ],
    filters: ['Categories', 'Places', 'Merchants', 'Memories'],
  },
  trip: {
    id: 'trip',
    title: 'A trip is not a pin.',
    body: 'A memory is the date window. A place is where the charge happened.',
    memory: { title: 'Lisbon weekend', detail: '12–14 Apr' },
    place: { title: 'Mercado da Ribeira', detail: 'Place' },
  },
  trail: {
    id: 'trail',
    sample: 'Sample',
    title: 'The trip leaves a trail.',
    body: 'Save the trip, and keep each charge in its own currency. The map joins the places in the order you visited. The same spend breaks down by time, category, people, and what is still open.',
    name: 'Lisbon weekend',
    note: 'Totals return in your profile currency.',
    stops: [
      { index: '1', name: 'Cafe Lumen', when: 'Morning', amount: '€18.40', slot: 'morning' as const },
      { index: '2', name: 'Mercado da Ribeira', when: 'Afternoon', amount: '€86.00', slot: 'afternoon' as const },
      { index: '3', name: 'Alfama rooms', when: 'Evening', amount: '€420.00', slot: 'evening' as const },
    ],
    reads: ['Time', 'Category', 'People', 'Still open'],
  },
};

export const voices = {
  id: 'voices',
  sample: 'Sample',
  title: 'Hear from the people.',
  reviews: [
    {
      name: 'Maya',
      initial: 'M',
      stars: 5,
      quote: 'Each dish had its own people. The net was clear before we left the table.',
    },
    {
      name: 'Jonah',
      initial: 'J',
      stars: 5,
      quote: 'The payment sat next to the bill. The cost and the transfer stayed easy to tell apart.',
    },
    {
      name: 'Priya',
      initial: 'P',
      stars: 5,
      quote: 'The weekend stayed one memory, and the map drew the trail in the order we went.',
    },
    {
      name: 'Maya',
      initial: 'M',
      stars: 5,
      quote: 'I dictated the note, checked the draft, and saved the expense.',
    },
    {
      name: 'Jonah',
      initial: 'J',
      stars: 5,
      quote: 'The grocery cap followed the share, and it warned before the month was gone.',
    },
    {
      name: 'Priya',
      initial: 'P',
      stars: 5,
      quote: 'Cafe Lumen stayed in euros. The total came back in my currency.',
    },
  ],
};

export const spendMap = {
  title: 'Where the money was spent.',
  lede: 'Pins show the place. The trail joins them in the order you visited.',
};

export const siteClose = {
  privacy: 'You control who can find you and invite you.',
  guide: 'User guide',
};

export const hero = {
  eyebrow: 'Spending, pinned to the place',
  title: 'See every expense.',
  accent: 'Split it with the group.',
  lede:
    'The wallet shows what you spent. A group holds the expenses and transfers. The map pins each charge to the place it happened.',
  cta: 'See the sample',
  ctaHref: '#ledger',
};

export const ledgerCard = {
  title: 'Recent expenses',
  detail: 'Sample group · the last few days.',
  badge: 'Sample',
  add: 'Add an expense',
};

export const sampleExpenses = [
  {
    title: 'Morning coffee',
    detail: 'Cafe Lumen · Downtown',
    amount: '$18.40',
    status: 'Settled' as const,
    icon: 'coffee' as const,
  },
  {
    title: 'Airport ride',
    detail: 'North line · Station',
    amount: '$64.00',
    status: 'You owe' as const,
    icon: 'car' as const,
  },
  {
    title: 'Loft dinner',
    detail: 'Harbor table · Waterfront',
    amount: '$186.20',
    status: 'Settled' as const,
    icon: 'home' as const,
  },
];

export const spendSummary = {
  title: 'Spent this month',
  amount: '$4,280',
  delta: 'Sample · +12% from last month',
  from: 'Apr',
  to: 'Jul',
  bars: [46, 62, 38, 74, 52, 68, 96, 78, 110, 72, 88, 124],
};

export const balance = {
  title: 'Your balance',
  detail: 'Sample group · share of spend already settled.',
  period: 'This month',
  percent: '64%',
  chartLabel: 'Sample balance trend, 64 percent settled',
};

export const surfaces = {
  caption: 'What the app keeps in one place',
  items: ['Expenses', 'Groups', 'Map', 'Budgets', 'Transfers'],
};

export const placesSection = {
  eyebrow: 'Places',
  title: 'Find the charge',
  accent: 'where it happened.',
};

export const placeStories = [
  {
    title: 'Scan the receipt',
    accent: 'before it is only a photo.',
    body: 'Adding an expense can open the camera. The charge becomes a record the group can see.',
  },
  {
    title: 'Find any charge',
    accent: 'on the map of places.',
    body: 'Dinner, the tram, the room. Each one can sit on a place, not only in a list.',
  },
  {
    title: 'A budget for the trip',
    accent: 'or for the place itself.',
    body: 'Budgets attach to a group or a place, so the limit lives next to the spending.',
  },
];

export const solution = {
  eyebrow: 'Budgets',
  title: 'One ledger',
  accent: 'for every group.',
  lede:
    'Who paid, how it was split, and which place it belongs to. Transfers between people sit beside the expenses.',
};

export const sampleGroup = {
  name: 'Lisbon weekend',
  meta: 'Sample group · 4 people',
  steps: ['Capture', 'Split', 'Place', 'Budget'],
  activeStep: 'Split',
  feature: {
    title: 'Saturday dinner',
    amount: '$186.20',
    note: 'Maya paid · split 4 ways',
  },
  rows: [
    { place: 'Mercado da Ribeira', kind: 'Food', amount: '$86.00', who: 'Maya paid' },
    { place: 'Tram day passes', kind: 'Transit', amount: '$24.00', who: 'You paid' },
    { place: 'Alfama rooms', kind: 'Stay', amount: '$420.00', who: 'Jonah paid' },
  ],
  owed: {
    label: 'You are owed',
    amount: '$128.40',
    note: 'Priya and Jonah still open',
    bars: [18, 28, 16, 36, 24],
  },
  split: {
    you: 'You',
    maya: 'Maya',
    hubTitle: 'Dinner',
    hubAmount: '$186',
    jonah: 'Jonah',
    priya: 'Priya',
  },
};
