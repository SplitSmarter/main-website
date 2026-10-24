import { IconCar, IconCoffee, IconHome } from '@tabler/icons-react';
import { sampleExpenses, sampleGroup, spendSummary } from '@/content/product';
import styles from '../StartPage.module.css';

const icons = {
  coffee: IconCoffee,
  car: IconCar,
  home: IconHome,
};

export function PhoneMock() {
  return (
    <div className={styles.stage} id="phone">
      <div className={styles.phone}>
        <div className={styles.screen}>
          <span className={styles.island} aria-hidden />
          <div className={styles.map} aria-hidden />
          <div className={styles.app}>
            <p className={styles.appKicker}>{spendSummary.title}</p>
            <strong className={styles.appAmount}>{spendSummary.amount}</strong>
            <p className={styles.appDelta}>{spendSummary.delta}</p>
            <ul>
              {sampleExpenses.map((expense) => {
                const Icon = icons[expense.icon];
                const owed = expense.status === 'You owe';
                return (
                  <li key={expense.title}>
                    <span className={styles.appIcon}>
                      <Icon size={15} stroke={1.6} />
                    </span>
                    <span>
                      <strong>{expense.title}</strong>
                      <small>{expense.detail}</small>
                    </span>
                    <span className={styles.appMeta}>
                      <em className={owed ? styles.owe : styles.settled}>{expense.status}</em>
                      {expense.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <aside className={styles.float}>
        <p>{sampleGroup.name}</p>
        <strong>{sampleGroup.feature.title}</strong>
        <span>{sampleGroup.feature.amount}</span>
      </aside>
    </div>
  );
}
