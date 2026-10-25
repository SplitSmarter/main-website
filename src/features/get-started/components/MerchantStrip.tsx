import amazon from '@/assets/merchants/amazon.svg';
import apple from '@/assets/merchants/apple.svg';
import blinkit from '@/assets/merchants/blinkit.png';
import bookmyshow from '@/assets/merchants/bookmyshow.png';
import dmart from '@/assets/merchants/dmart.png';
import flipkart from '@/assets/merchants/flipkart.png';
import ikea from '@/assets/merchants/ikea.svg';
import indigo from '@/assets/merchants/indigo.svg';
import mcdonalds from '@/assets/merchants/mcdonalds.svg';
import myntra from '@/assets/merchants/myntra.png';
import netflix from '@/assets/merchants/netflix.svg';
import nike from '@/assets/merchants/nike.svg';
import paytm from '@/assets/merchants/paytm.svg';
import phonepe from '@/assets/merchants/phonepe.svg';
import spotify from '@/assets/merchants/spotify.svg';
import starbucks from '@/assets/merchants/starbucks.svg';
import swiggy from '@/assets/merchants/swiggy.png';
import uber from '@/assets/merchants/uber.svg';
import walmart from '@/assets/merchants/walmart.png';
import zomato from '@/assets/merchants/zomato.png';
import { problemScenes } from '@/content/product';
import styles from '../StartPage.module.css';

const marks = [
  { name: 'Swiggy', logo: swiggy },
  { name: 'Starbucks', logo: starbucks },
  { name: 'Zomato', logo: zomato },
  { name: "McDonald's", logo: mcdonalds },
  { name: 'Flipkart', logo: flipkart },
  { name: 'Amazon', logo: amazon },
  { name: 'Blinkit', logo: blinkit },
  { name: 'Uber', logo: uber },
  { name: 'Myntra', logo: myntra },
  { name: 'Nike', logo: nike },
  { name: 'PhonePe', logo: phonepe },
  { name: 'Apple', logo: apple },
  { name: 'DMart', logo: dmart },
  { name: 'IKEA', logo: ikea },
  { name: 'BookMyShow', logo: bookmyshow },
  { name: 'Netflix', logo: netflix },
  { name: 'Paytm', logo: paytm },
  { name: 'Spotify', logo: spotify },
  { name: 'IndiGo', logo: indigo },
  { name: 'Walmart', logo: walmart },
];

export function MerchantStrip() {
  const rows = [marks, marks];

  return (
    <div className={styles.merchantStrip}>
      <p>{problemScenes.merchants.strip}</p>
      <div className={styles.marquee}>
        <div className={styles.reel}>
          {rows.map((list, row) => (
            <ul key={row} aria-hidden={row === 1 || undefined}>
              {list.map((mark) => (
                <li key={`${row}-${mark.name}`} className={styles.merchantCard}>
                  <span className={styles.merchantMark}>
                    <img src={mark.logo} alt="" />
                  </span>
                  {mark.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
