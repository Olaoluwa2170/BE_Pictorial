import { ID} from "appwrite";
import { databases } from "./config";

const trying = async () => {
    const tryUser = await databases.createDocument(
        '65873d523d2af22bf30b',
        '65873d62422e5f65d1e9',
        ID.unique(),
        {
            accountId: 'accountId',
            email: 'elitebabson@gmail.com',
            username: 'elitebabson@gmail.com',
            name: 'Babalola Elisha',
        }
    )
    if (tryUser) {
        console.log('tryYeah', tryUser)
    }
    return tryUser
}

const Appwrite = () => {
    trying()
  return (
    <div>Appwrite</div>
  )
}

export default Appwrite