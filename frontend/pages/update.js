import { useRouter } from 'next/router'
import UpdateItem from '../component/UpdateItem'

function Sell(props) {
  const router = useRouter()
  return (
    <div>
      <UpdateItem id={router.query.id} />
    </div>
  )
}

export default Sell
