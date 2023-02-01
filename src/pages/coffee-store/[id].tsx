import {useRouter} from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div>
      <Link href={'/'}>Back to home</Link>
      Coffee Store page

      {id && <p>Id = {id}</p>}
    </div>
  )
}

export default CoffeeStore;