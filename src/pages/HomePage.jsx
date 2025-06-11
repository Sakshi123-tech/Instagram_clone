// import React from 'react';

// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/layout/Navbar'
// import CommentForm from '../components/post/CommentForm'
// import CommentList from '../components/post/CommentList'
// import { useAuth } from '../context/AuthContext'
// import { usePost } from '../context/PostContext'
// // import { comment } from 'postcss'

// function HomePage() {
//   const { user } = useAuth()
//   const { posts, loading, fetchFeed, likePost, unlikePost } = usePost()
//   const navigate = useNavigate()
//   // const [newComments, setNewComments] = useState(null)

//   // console.log("comments", newComments)

//   useEffect(() => {
//     const loadfeed = async()=>{
//       try{
//         const response = await fetchFeed()
//       }
//       catch (err)
//       {

//         setError('failed to reload the page')
//       }
//     }
//     loadfeed()

  
//   }, [])

//   const handleLike = async (postId, isLiked) => {
//     if (isLiked) {
//       await unlikePost(postId)
//     } else {
//       await likePost(postId)
//     }
//   }

//   const handleCommentAdded = (postId, comment) => {
//     setNewComments(prev => ({
//       ...prev,
//       [postId]: comment
//     }))
//   }

//   if (loading) return <div className="text-center mt-20">Loading...</div>

//   return (
    
  
//    <div>
//       <Navbar />
//       <div className="max-w-5xl mx-auto mt-6 flex gap-6 px-5">
//         <div className="flex-1 max-w-[614px]">
//           <h2 className="mb-4">Your Feed</h2>

//           { !posts ||posts.data.length == 0 ? (
//             <p className="text-center text-gray-500 mt-10">No posts yet. Start following people!</p>
//           ) : (
//             posts?.data.map(post => (
//               <div key={post._id} className="bg-white border border-gray-300 rounded mb-6">
//                 <div className="p-3 border-b border-gray-100">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
//                       {post.user?.name?.[0] || 'U'}
//                     </div>
//                     <span className="text-sm font-medium">{post.user?.name || 'Anonymous'}</span>
//                   </div>
//                 </div>

//                 {post.image && (
//                   <div className="w-full">
//                     <img src={post.image} alt="Post" className="w-full h-auto block" />
//                   </div>
//                 )}

//                 <div className="p-3 flex gap-4">
//                   <button
//                     onClick={() => handleLike(post._id, post.isLiked)}
//                     className={`bg-transparent border-0 text-sm cursor-pointer p-0 ${
//                       post.isLiked ? 'text-red-500' : ''
//                     }`}
//                   >
//                     {post.isLiked ? '❤️' : '🤍'} {post.likesCount || 0}
//                   </button>
//                   <button className="bg-transparent border-0 text-sm cursor-pointer p-0">💬 Comment</button>
//                   <button className="bg-transparent border-0 text-sm cursor-pointer p-0">📤 Share</button>
//                 </div>

//                 <div className="px-4 pb-3 text-sm">
//                   <p><span className="font-medium">{post.user?.name}</span> {post.text}</p>
//                   <p className="text-gray-600 text-xs mt-2">
//                     {new Date(post.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <CommentList postId={post?._id}/> 

//                  <div className="border-t border-gray-100 px-4 py-2">
//                   <CommentForm
//                     postId={post._id}
//                     // onCommentAdded={(comment) => handleCommentAdded(post._id, comment)}
//                   />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="w-80 sticky top-20 h-fit hidden md:block">
//           <h3 className="text-sm text-gray-600 mb-4">Suggestions For You</h3>
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">S1</div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">suggested_user1</p>
//                 <p className="text-xs text-gray-600">Follows you</p>
//               </div>
//               <button className="bg-transparent border-0 text-blue-500 text-xs font-semibold cursor-pointer">Follow</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   )
// } 

// export default HomePage




import React from 'react';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CommentForm from '../components/post/CommentForm'
import CommentList from '../components/post/CommentList'
import { useAuth } from '../context/AuthContext'
import { usePost } from '../context/PostContext'

function HomePage() {
  const { user } = useAuth()
  const { posts, loading, fetchFeed, likePost, unlikePost } = usePost()
    const [newComments, setNewComments] = useState({})
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [activePostId, setActivePostId] = useState(null)

  useEffect(() => {
    const loadfeed = async () => {
      try {
        await fetchFeed();
      } catch (err) {
        setError('Failed to reload the page');
      }
    }
    loadfeed();
  }, [])

   const handleLike = async (post) => {
    const allPeopleWhoLiked = post.likes
    const haveILiked = allPeopleWhoLiked.find(like => like._id === user.id)
    if (haveILiked) {
      await unlikePost(post._id)
    } else {
      await likePost(post._id)
    }
  }
  const handleCommentAdded = (postId, comment) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: comment
    }))
  }
  useEffect(() => {
  if (activePostId !== null) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  }, [activePostId])


  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-90 min-h-screen">
 {/* <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen"> */}
 {/* <div className="bg-gray-900 text-white min-h-screen"> */}

      <Navbar />
      <div className="max-w-5xl mx-auto mt-6 flex gap-6 px-5">
        <div className="flex-1 max-w-[614px]">
          <h2 className="mb-4">Your Feed</h2>

          {!posts || posts.data.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No posts yet. Start following people!</p>
          ) : (
            posts?.data.map(post => (
              <div 
                key={post._id} 
                className="bg-blue-50 border border-gray-300 rounded mb-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                      {post.user?.name?.[0] || 'U'}
                    </div>
                    <span className="text-sm font-medium">{post.user?.name || 'Anonymous'}</span>
                  </div>
                </div>

                {post.image && (
                  <div className="w-full">
                    <img src={post.image} alt="Post" className="w-full h-auto block rounded-md" />
                  </div>
                )}
                 <div className="p-4 bg-white rounded-md shadow-md">
                  {post.text && <p className="text-gray-800">{post.text}</p>}
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>

                <div className="p-3 flex gap-4">
                  <button
                    onClick={() => handleLike(post._id, post.isLiked)}
                    className={`bg-transparent border-0 text-sm cursor-pointer p-0 ${
                      post.isLiked ? 'text-red-500' : ''
                    }`}
                  >
                    {post.isLiked ? '❤️' : '🤍'} {post.likesCount || 0}
                  </button>
                  <button className="bg-transparent border-0 text-sm cursor-pointer p-0" onClick={() => setActivePostId(post._id)}>💬 Comment</button>
                  <button className="bg-transparent border-0 text-sm cursor-pointer p-0">📤 Share</button>
                </div>

                {activePostId === post._id && (
                  <div className="bg-white shadow-md rounded-md p-4">
               <div className="relative">
               <button onClick={() => setActivePostId(null)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                  ❌
                </button>
                 <CommentList postId={post._id} newComment={newComments[post._id]} />
                  </div>
                    </div>
                     )}

                   <div className="border-t border-gray-200 px-4 py-2">
                 <CommentForm postId={post._id} onCommentAdded={(comment) => handleCommentAdded(post._id, comment)} />
                  </div>

              </div>
            ))
          )}
        </div>

<div className="w-100 bg-gray-800 text-white rounded-xl shadow-xl mt-10 p-5 h-100 border border-gray-700">
  <div className="flex flex-col items-center text-center space-y-3">
    <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full text-2xl font-bold shadow-md">
      {user?.name?.[0]?.toUpperCase() || 'U'}
    </div>
    <p className="text-gray-300 font-semibold tracking-wide">
      @{user?.name?.toLowerCase().replace(/\s+/g, '_')}
    </p>
    <p className="text-sm text-gray-400">🔹 Suggested for you</p>
  </div>

  <div className="mt-6 border-t border-gray-600 pt-4">
    <div className="text-center">
      <p className="text-base text-gray-300 font-medium tracking-wide">
        🚀 Exciting features coming soon...
      </p>
    </div>
    <div className="mt-6 text-center text-xs text-gray-500">
      <p>&copy; 2025 Social Media</p>
    </div>
  </div>
</div>



      </div>
    </div>
  )
} 

export default HomePage;


















