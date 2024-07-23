import {AddPostForm} from './features/posts/AddPostForm'
import {PostsList} from './features/posts/PostsList'

const App = () => {
    console.log("The app.js rendered")
    return (
        <>
            <AddPostForm />
            <PostsList />
        </>
    )
}
export default App