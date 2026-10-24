import { IconCar, IconChevronDown, IconCoffee, IconHome, IconPlus } from '@tabler/icons-react';
import { balance, ledgerCard, sampleExpenses, spendSummary } from '@/content/product';
import styles from '../SpatialPreview.module.css';

const expenseIcons = {
  coffee: IconCoffee,
  car: IconCar,
  home: IconHome,
};

function SpendBars() {
  return (
    <div className={styles.bars} aria-hidden>
      {spendSummary.bars.map((height, index) => (
        <span key={`${height}-${index}`} style={{ height }} />
      ))}
    </div>
  );
}

function BalanceChart() {
  return (
    <div className={styles.chartWrap}>
      <svg className={styles.areaChart} viewBox="0 0 340 150" role="img" aria-label={balance.chartLabel}>
        <defs>
          <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 118 C28 120 46 98 74 102 S128 122 156 88 S206 46 236 64 S286 86 318 34 L340 22 V150 H0 Z"
          fill="url(#balanceFill)"
        />
        <path
          d="M0 118 C28 120 46 98 74 102 S128 122 156 88 S206 46 236 64 S286 86 318 34 L340 22"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.chartPercent}>{balance.percent}</span>
    </div>
  );
}

export function LedgerCards() {
  return (
    <section className={styles.ledger} id="ledger" aria-label="Expense ledger">
      <article className={styles.card}>
        <header className={styles.cardHead}>
          <div>
            <h2>{ledgerCard.title}</h2>
            <p>{ledgerCard.detail}</p>
          </div>
          <span className={styles.live}>{ledgerCard.badge}</span>
        </header>
        <ul className={styles.expenseList}>
          {sampleExpenses.map((expense) => {
            const Icon = expenseIcons[expense.icon];
            const owed = expense.status === 'You owe';
            return (
              <li key={expense.title}>
                <span className={styles.iconWell}>
                  <Icon size={16} stroke={1.5} />
                </span>
                <span className={styles.expenseCopy}>
                  <strong>{expense.title}</strong>
                  <span>{expense.detail}</span>
                </span>
                <span className={styles.expenseMeta}>
                  <span className={owed ? styles.pillOwe : styles.pillOk}>{expense.status}</span>
                  <span className={styles.amount}>{expense.amount}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <button type="button" className={styles.addExpense}>
          <IconPlus size={14} stroke={1.7} />
          {ledgerCard.add}
        </button>
      </article>

      <article className={styles.card}>
        <header className={styles.cardHead}>
          <div>
            <h2>{spendSummary.title}</h2>
            <p className={styles.stat}>{spendSummary.amount}</p>
            <p className={styles.delta}>{spendSummary.delta}</p>
          </div>
        </header>
        <div className={styles.chartBlock}>
          <SpendBars />
          <div className={styles.axis}>
            <span>{spendSummary.from}</span>
            <span>{spendSummary.to}</span>
          </div>
        </div>
      </article>

      <article className={styles.card}>
        <header className={styles.cardHead}>
          <div>
            <h2>{balance.title}</h2>
            <p>{balance.detail}</p>
          </div>
          <button type="button" className={styles.week}>
            {balance.period}
            <IconChevronDown size={14} stroke={1.6} />
          </button>
        </header>
        <BalanceChart />
      </article>
    </section>
  );
}
