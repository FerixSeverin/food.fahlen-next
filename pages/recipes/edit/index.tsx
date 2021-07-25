import React from 'react'
import { useRouter } from 'next/dist/client/router'

const EditIndex: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  return (<>
    Hej: {id}
  </>)

}

export default EditIndex