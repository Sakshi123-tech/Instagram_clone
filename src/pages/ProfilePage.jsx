// import React,{useState,useEffect} from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
// import { useAuth } from '../context/AuthContext'
// import { userApi, postApi } from '../services/api'

// function ProfilePage(){
  
//     const {userId}=useParams()
//     const{user}=useAuth()
//     const navigate=useNavigate()
//     console.log("user",user)
//     const [profile, setProfile] = useState(null)
//     const [posts, setPosts] = useState([])
//     const [isEditing, setIsEditing] = useState(false)
//     const [editName, setEditName] = useState('') 
//     const [loading, setLoading] = useState(true)


//     const targetUserId = userId || user?._id
//     const isOwnProfile = !userId || userId === user?._id

// //     console.log("userId param:", userId);
// // console.log("user from context:", user);
// console.log("targetUserId to fetch:", targetUserId);

//     useEffect(()=>{
//         if(!user ){
//             navigate('/login')
//             return
//         }
//         const fetchProfile=async()=>{
//             try{
//                 const profileResponse=await userApi.getUserProfile(targetUserId)
//                 console.log("abc",profileResponse)
//                 setProfile(profileResponse.data)
//                 console.log(profileResponse)
//                 setEditName(profileResponse.data.name)

//                 const postsResponse=await postApi.getMyPosts()
//                 console.log("cde",postsResponse)
//                 setPosts(postsResponse.data.data)
//             }
//             catch (error){
//                 console.error('Error fetching profile:',error)
//             }
//             finally{
//                 setLoading(false)
//             }
//         }

//         fetchProfile()
//     },[targetUserId,user,navigate])

//     const handleEditProfile=async()=>{
//         try{
//             const response=await userApi.updateProfile({name:editName})
//             console.log(response)
//             setProfile(response.data)
//             setIsEditing(false)
//         }
//         catch(error){
//             console.error('Error updating profile:',error)
//         }
//     }
//     if (loading) {
//     return <div className="text-center mt-20">Loading...</div>
//     }

//     if (!profile) {
//     return <div className="text-center mt-20">Profile not found</div>
//     }
//     return(
        

//     <div>
//       <Navbar />
//       <div className="profile-container">
//         {/* Profile Header */}
//         <div className="max-w-5xl mx-auto mt-6 px-5">
//   <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6 bg-white shadow-md">
//     <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
//       {profile.name?.[0] || 'U'}
//     </div>

//     <div className="mt-4 text-center">
//       {isEditing ? (
//         <div className="flex flex-col items-center">
//           <input
//             type="text"
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             className="border border-gray-300 rounded px-2 py-1 text-center"
//           />
//           <div className="mt-2 flex gap-2">
//             <button onClick={handleEditProfile} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Save
//             </button>
//             <button onClick={() => setIsEditing(false)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <h2 className="text-xl font-bold">{profile.name}</h2>
//           {isOwnProfile && (
//             <button onClick={() => setIsEditing(true)} className="mt-2 px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
//               Edit Profile
//             </button>
//           )}
//         </>
//       )}
//     </div>

//     <div className="flex gap-6 mt-4 text-gray-700">
//       <span><strong>{posts.length}</strong> posts</span>
//       <span><strong>0</strong> followers</span>
//       <span><strong>0</strong> following</span>
//     </div>
//   </div>
// </div>


//         {/* Posts Grid */}
//        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//   {posts && posts.length > 0 ? (
//     posts.map(post => (
//       <div key={post._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
//         {post.image ? (
//           <img src={post.image} alt="Post Image" className="w-full h-48 object-cover rounded-md" />
//         ) : (
//           <div className="p-4 bg-gray-100 rounded-md text-center">
//             <span className="text-gray-700">{post.text}</span>
//           </div>
//         )}
//       </div>
//     ))
//   ) : (
//     <p className="text-center text-gray-500">No posts yet.</p>
//   )}
// </div>


//         {posts.length === 0 && (
//           <div className="no-posts-message">No posts yet</div>
//         )}
//       </div>
//     </div>
  


//     )
// }
// export default ProfilePage



// // <div className="profile-container">
// //         {/* Profile Header */}
// //         <div className="profile-header">
// //           <div className="profile-avatar">
// //             {profile.name?.[0] || 'U'}
// //           </div>

// //           <div className="profile-details">
// //             <div className="profile-name-section">
// //               {isEditing ? (
// //                 <div className="edit-controls">
// //                   <input
// //                     type="text"
// //                     value={editName}
// //                     onChange={(e) => setEditName(e.target.value)}
// //                     className="edit-name-input"
// //                   />
// //                   <button onClick={handleEditProfile} className="save-button">Save</button>
// //                   <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <h2 className="profile-name">{profile.name}</h2>
// //                   {isOwnProfile && (
// //                     <button onClick={() => setIsEditing(true)} className="edit-profile-button">Edit Profile</button>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             <div className="profile-stats">
// //               <span><strong>{posts.length}</strong> posts</span>
// //               <span><strong>0</strong> followers</span>
// //               <span><strong>0</strong> following</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Posts Grid */}
// //         <div className="posts-grid">
// //           {posts && posts.length>0 && posts.map(post => (
// //             <div key={post._id} className="post-tile">
// //               {post.image ? (
// //                 <div>
// //                 <img src={post.image} alt="img" className="post-image" />
// //                 <div className="text-only-tile">
// //                   <span className="text-only-message">{post.text}</span>
// //                 </div>
// //                 </div>
                
// //               ) : (
// //                 <div className="text-only-tile">
// //                   <span className="text-only-message">{post.text}</span>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {posts.length === 0 && (
// //           <div className="no-posts-message">No posts yet</div>
// //         )}
// //       </div>
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from '../context/AuthContext'
import { userApi, postApi } from '../services/api'

function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const targetUserId = userId || user?._id;
  const isOwnProfile = !userId || userId === user?._id;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchProfile = async () => {
      try {
        const profileResponse = await userApi.getUserProfile(targetUserId);
        setProfile(profileResponse.data);
        setEditName(profileResponse.data.name);

        const postsResponse = await postApi.getMyPosts();
        setPosts(postsResponse.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetUserId, user, navigate]);
//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const profileResponse = await userApi.getUserProfile(targetUserId);
//       setProfile(profileResponse.data);
//       setProfileImage(profileResponse.data.profileImage); // Set saved profile image
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   fetchProfile();
// }, [targetUserId]);


  const handleEditProfile = async () => {
    try {
      const response = await userApi.updateProfile({ name: editName });
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
 const handleRemovePostWithAlert = async (postId) => {
  const confirmDelete = window.confirm("Are you sure that you want to remove this post?");
  if (confirmDelete) {
    try {
      await postApi.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      alert("Post successfully removed!");
    } catch (error) {
      console.error("Error removing post:", error);
    }
  }
};



const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      const response = await userApi.updateProfile({ userId: user._id, profileImage: file });
      setProfileImage(response.data.profileImage); // Store image from backend
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};


  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-20">Profile not found</div>;
  }

  return (
  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
    <Navbar />
    
    {posts && posts.length > 0 ? (
      <>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6 mt-4 bg-gradient-to-br from-blue-200 via-white to-blue-200 shadow-xl w-full">
          {/* Heading & Subheading */}
          <h1 className="text-3xl font-bold text-gray-800">
        Wooww! 🎉 {editName && editName.length > 0 ? editName : profile.name}, now you can see all your posts!
          </h1>

          <p className="text-lg text-gray-600 mt-2">Manage your content easily—you can even delete posts you no longer need.</p>

          {/* Profile Name & Edit */}
          <div className="mt-6 text-center">
            {isEditing ? (
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-center shadow-sm w-60"
                />
                <div className="mt-3 flex gap-3">
                  <button onClick={handleEditProfile} className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                {isOwnProfile && (
                  <button onClick={() => setIsEditing(true)} className="mt-3 px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                    Edit Profile
                  </button>
                )}
              </>
            )}
          </div>

          {/* Profile Stats */}
          <div className="flex gap-8 mt-5 text-gray-700 text-lg">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="flex flex-col items-center w-full mt-8 space-y-6">
  {posts.map(post => (
    <div key={post._id} className="w-full max-w-3xl rounded-lg p-5 bg-white shadow-md hover:shadow-lg transition flex flex-col items-center justify-center">
      {/* Post Image or Text */}
      {post.image ? (
        <div className="flex justify-center items-center w-full">
          <img src={post.image} alt="Post Image" className="w-full max-w-xl h-auto object-cover rounded-md shadow-md" />
        </div>
      ) : (
        <div className="p-5 bg-gradient-to-br from-blue-200 via-white to-blue-90 rounded-md text-center flex items-center justify-center w-full h-40">
          <span className="text-gray-700 text-lg text-wrap">{post.text}</span>
        </div>
      )}

      {/* Remove Post Button */}
      <button 
        onClick={() => handleRemovePostWithAlert(post._id)} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full text-center shadow-sm"
      >
        Remove Post
      </button>
    </div>
  ))}
</div>


      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-gray-700">😞 Ohh sorry, {profile.name},</h1>
        <p className="text-lg text-gray-500 mt-2">Till now, you haven't created any posts.</p>
        <p className="text-lg text-gray-400">Start sharing your thoughts today!</p>
      </div>
    )}
  </div>
);

}

export default ProfilePage;



