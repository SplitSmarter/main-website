export const brand = 'Split Smarter';

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/splitsmarter.app' },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/HU90mWJwziy1pnibVREpWZ' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/splitsmarter/' },
  { label: 'Discord', href: 'https://discord.gg/Y6JCGfEp9w' },
] as const;

export const answers = [
  {
    question: 'What was this bank line for?',
    answer:
      'A bank record can be linked to an expense. On the expense you manage the split and the amount. The bank record and the expense stay separate, and they stay in sync.',
  },
  {
    question: 'How can I add an expense and settle with friends?',
    answer:
      'Add the expense, then settle with the people who shared it. Who paid is separate from who it was shared between. One person can pay for an item that several people share. Net is what someone paid minus their share. The person who paid can link a bank transfer to the settlement. The expense and the transfer stay side by side, so paying someone back does not erase the dinner.',
  },
  {
    question: 'How can groceries and produce both count as food?',
    answer:
      'Give each type a name and a parent category. Groceries is a type under Food. Produce is a type under Food. Food sits above both, so a query on Food includes both expenses. A budget on Food covers both types. A budget on Groceries covers only that type.',
  },
  {
    question: 'How can I see what I buy across many shops?',
    answer:
      'A catalog of items and merchants covers what you can spend on, in shops and online. You can view your expenses across many merchants, offline and online.',
  },
  {
    question: 'How can I see a trip when the spending is still in the other currency?',
    answer:
      'A memory keeps the trip. You see how it was spent, each charge in the country’s currency, and the total in yours with live conversion rates. Add it to your list of memories. A memory can be turned on or off. You can revisit the whole trip later.',
  },
  {
    question: 'How can I see the pattern when I keep returning to the same places?',
    answer:
      'Analytics shows the region you spend in. Spending at the same shop stays together, visit after visit.',
  },
] as const;

export const startNav = [
  { label: 'Add', href: '#capture' },
  { label: 'Ledger', href: '#ledger' },
  { label: 'Budget', href: '#budget' },
  { label: 'Map', href: '#map' },
] as const;

export const getStarted = {
  title: 'Get started',
  headline: 'Track every expense.',
  lede: 'Turn your bank records into insight. See how your money flows.',
  cta: 'Get started',
};

export const proof = [
  { value: '4', label: 'Languages supported', icon: 'language' as const },
  { value: '156', label: 'Currencies supported', icon: 'currency' as const },
  { value: '$0', label: 'Start for free', icon: 'price' as const },
];

export const problemScenes = {
  capture: {
    id: 'capture',
    title: 'A bill, a note, or your voice.',
    body: 'Add a photo of the bill, a written note, or a note you dictate. A photo and a note can go together. The expense is filled in for you to review, then save.',
    heading: 'Scan receipt',
    hint: 'Dictate a note, add a photo, or both.',
    note: 'Goa trip. Sea bass for me and Anika.',
    trip: 'Goa trip',
    photos: 'Photos',
    bill: 'Bill',
    camera: 'Camera',
    library: 'Library',
    action: 'Scan',
    scanning: 'Scanning…',
    reading: 'Parsing this expense',
    readingDetail: 'Parsing the receipt into this expense.',
    thoughts: ['Four people on the Goa trip', 'Sea bass, grilled chicken, and drinks at Cafe Lumen', 'Total €182.00'],
    review: 'Review',
    loggedTitle: 'Cafe Lumen',
    loggedDetail: 'Food',
    loggedPlace: 'Harbor',
    loggedAmount: '€182.00',
    saved: {
      total: '€182.00',
      split: 'Total split: 4 people',
      lines: [
        {
          title: 'Sea bass',
          amount: '€18.40',
          icon: 'fish' as const,
          paidBy: [{ person: 'Anika', initial: 'A' }],
          shared: [] as { person: string; initial: string }[],
        },
        {
          title: 'Grilled Chicken',
          amount: '€14.10',
          icon: 'plate' as const,
          paidBy: [{ person: 'You', initial: 'Y' }],
          shared: [
            { person: 'Anika', initial: 'A' },
            { person: 'You', initial: 'Y' },
            { person: 'Jonah', initial: 'J' },
            { person: 'Priya', initial: 'P' },
          ],
        },
        {
          title: 'Drinks & Cocktails',
          amount: '€149.50',
          icon: 'glass' as const,
          paidBy: [] as { person: string; initial: string }[],
          shared: [] as { person: string; initial: string }[],
        },
      ],
    },
  },
  ledger: {
    id: 'ledger',
    title: 'Who paid is not the share.',
    body: 'Split by item. One item can be shared between several people. Net is what someone paid minus their share.',
    paid: 'Anika · €182.00',
    items: [
      {
        title: 'Sea bass',
        amount: '$64.00',
        icon: 'dish' as const,
        shared: [
          { person: 'Anika', initial: 'A' },
          { person: 'You', initial: 'Y' },
        ],
      },
      {
        title: 'Wine',
        amount: '€40.00',
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
      amount: '€182.00',
      shared: [
        { person: 'Anika', initial: 'A' },
        { person: 'You', initial: 'Y' },
        { person: 'Jonah', initial: 'J' },
        { person: 'Priya', initial: 'P' },
      ],
    },
    transfer: { kind: 'Transfer', title: 'You to Anika', detail: 'Person to person', amount: '€46.55' },
  },
  receipt: {
    id: 'receipt',
    title: 'One receipt, more than one category.',
    body: 'Groceries and Produce stay under Food. Household stays under Home. A parent covers those related categories, not a category chosen at random.',
    groups: [
      {
        parent: 'Food',
        lines: [
          { title: 'Groceries', amount: '€42.10', icon: 'basket' as const },
          { title: 'Produce', amount: '€12.00', icon: 'basket' as const },
        ],
      },
      {
        parent: 'Home',
        lines: [
          { title: 'Household', amount: '€18.40', icon: 'home' as const },
        ],
      },
    ],
    total: { label: 'Total', amount: '€72.50' },
  },
  merchants: {
    id: 'merchants',
    title: 'The same shop, every visit.',
    body: 'Search a large merchant catalog, or add your own. Spend at one merchant stays together, and a branch is the place that payment went.',
    strip: 'Supports the majority of merchants',
    rows: [
      { name: 'Mercado da Ribeira', branch: 'Downtown', amount: '€86.00' },
      { name: 'Cafe Lumen', branch: 'Harbor', amount: '€182.00' },
      { name: 'Alfama rooms', branch: 'Alfama', amount: '€420.00' },
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
      { person: 'Anika', initial: 'A' },
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
    title: 'The trip leaves a trail.',
    body: 'Save the trip, and keep each charge in its own currency. The map joins the places in the order you visited. The same spend breaks down by time, category, people, and what is still open.',
    name: 'Lisbon weekend',
    note: 'Totals return in your profile currency.',
    stops: [
      { index: '1', name: 'Cafe Lumen', when: 'Morning', amount: '€182.00', slot: 'morning' as const },
      { index: '2', name: 'Mercado da Ribeira', when: 'Afternoon', amount: '€86.00', slot: 'afternoon' as const },
      { index: '3', name: 'Alfama rooms', when: 'Evening', amount: '€420.00', slot: 'evening' as const },
    ],
    reads: ['Time', 'Category', 'People', 'Still open'],
  },
};

export const voices = {
  id: 'voices',
  title: 'Hear from the people.',
  reviews: [
    {
      name: 'Anika',
      initial: 'A',
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
      name: 'Anika',
      initial: 'A',
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
  guideTitle: 'Guide',
  privacyTitle: 'Privacy',
  privacy: 'You have full control over your data and visibility. You can decide who can find you and invite you.',
  privacyLink: { label: 'Who can find you', path: '/en/account/howto-manage-profile-visibility' },
  guide: [
    { label: 'User guide', path: '' },
    { label: 'Expenses', path: '/en/expenses' },
    { label: 'Budgets', path: '/en/budgets' },
    { label: 'Places', path: '/en/places' },
    { label: 'Settle', path: '/en/settlements' },
  ],
  start: 'Get started',
  email: 'support@splitsmarter.app',
};
