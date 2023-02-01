import Image from "next/image";
import Link from "next/link";

import style from '../styles/Card.module.css';

type Props = {
  href: string;
  title: string;
  imgURL: string;
}
const Card = ({href, title, imgURL}: Props) => {
  return (
    <Link href={href} className={style.cardLink}>
      <div className={`${style.container} glass`}>
        <div className={style.titleWrapper}>
          <h2 className={style.title}>{title}</h2>
        </div>

        <div className={style.imageWrapper}>
          <Image
            className={style.cardImage}
            src={imgURL}
            alt={'coffee shop'}
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  )
}

export default Card;