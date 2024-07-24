import {AddPostForm} from './features/posts/AddPostForm'
import {PostsList} from './features/posts/PostsList'
import './App.css'; // Ensure this import is present
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