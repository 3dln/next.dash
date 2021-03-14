import ViewSource from 'components/view-source';
import styles from '../css/styles.module.css';
import Image from 'next/image';

const Background = () => {
  return (
    <div>
      <ViewSource pathname="pages/background.js" />
      <div className={styles.bgWrap}>
        <Image alt="Mountains" src="/mountains.jpg" layout="fill" objectFit="cover" quality={100} />
      </div>
      <p className={styles.bgText}>
        Image Component <br />
        as a Background
      </p>
    </div>
  );
};

export default Background;
