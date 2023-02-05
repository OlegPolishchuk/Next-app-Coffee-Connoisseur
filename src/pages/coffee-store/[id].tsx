import {useRouter} from "next/router";
import Link from "next/link";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";

import coffeeStores from '../../data/coffee-stores.json';
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import styles from '../../styles/coffee-store.module.css';
import Image from "next/image";

export type Store = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
}

type Props = {
  coffeeStore: Store
}

const CoffeeStore: NextPage<Props> = ({coffeeStore}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const {id: storeId, imgUrl, websiteUrl, name, address, neighbourhood} = coffeeStore;
  const {id} = router.query;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>

          <div className={styles.backToHomeLink}>
            <Link href={'/'}>Back to home</Link>
          </div>

         <div className={styles.nameWrapper}>
           <h1 className={styles.name}>name: {name}</h1>
         </div>

          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={300}
            className={styles.storeImg}
          />
        </div>

        <div className={`${styles.col2} glass`}>
         <div className={styles.iconWrapper}>
           <Image
             src={'/static/icons/place.svg'}
             alt={'place'}
             width={24}
             height={24}
           />

           <p className={styles.text}>address: {address}</p>
         </div>

          <div className={styles.iconWrapper}>
            <Image
              src={'/static/icons/nearMe.svg'}
              alt={'neighborhood'}
              width={24}
              height={24}
            />

            <p className={styles.text}>neighborhood: {neighbourhood}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src={'/static/icons/star.svg'}
              alt={'star'}
              width={24}
              height={24}
            />

            <p className={styles.text}>1</p>
          </div>

          <button
            className={styles.upvoteButton}
            onClick={handleUpvoteButton}
          >
            Upvote
          </button>
        </div>
      </div>

    </div>
  )
}

export default CoffeeStore;


type Params = ParsedUrlQuery & {
  id: string
}
export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const { id } = params as Params;

  return {
    props: {
      coffeeStore: coffeeStores.find(store => store.id === Number(id)) || {
        id: 0,
        address: '',
        imgUrl: '',
        name: 'name',
        neighbourhood: '',
        websiteUrl: '',
      }  //dynamic id
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = coffeeStores.map(store => ({
    params: {id: store.id.toString()}
  }))
  return {
    paths,
    fallback: true,
  }
}