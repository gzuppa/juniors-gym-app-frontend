import { useContext } from 'react'
import MemberContext from '../context/MemberProvider'

const useMembers = () => {
  return useContext(MemberContext)
}

export default useMembers
