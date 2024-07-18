
import { useAddProfileMutation } from "@/app/redux/api/UserApi"
import { selectCurrentToken, selectCurrentUserImg, setUserImg } from "@/features/auth/authSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const AddProfile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(selectCurrentUserImg)
  const [saveChange, SetSaveChange] = useState(false)

  const [loading, setLoading] = useState(false);

  




 

  const [AddProfile]=useAddProfileMutation()



  const imageUpload = async(formData:FormData) => {

    try {
      setLoading(true);
 

      const response=await AddProfile(formData).unwrap()

      if(response){
        dispatch(setUserImg(response.profile_image))
      }
      
 
      setLoading(false);
    } catch (error) {
      console.error("Failed to upload image:", error);
      setLoading(false); 
    }
  };


  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
          const selectedFile = files[0];
       
          const fileReader = new FileReader();
      

          fileReader.readAsDataURL(selectedFile);

          const formData = new FormData();
          formData.append('profile_image', selectedFile);



 
          imageUpload(formData)

      }

  };
  return (
    <input
    type="file"
    accept="image/*"
    className="w-full h-full  bg-white text-black"
    id="setting-form-1"
    onChange={handleImageChange}
/>
  )
}
export default AddProfile