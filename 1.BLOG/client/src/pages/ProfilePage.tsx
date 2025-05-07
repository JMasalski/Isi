import {useParams} from "react-router";


const ProfilePage = () => {
  const {username} = useParams()
  return (
    <div>{`ProfilePage ${username}`}</div>
  )
}

export default ProfilePage