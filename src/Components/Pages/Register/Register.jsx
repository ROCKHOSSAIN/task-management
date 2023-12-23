import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "./register_lottie.json"
import useAxiousPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import app from "../../firebase/firebase.config";
import { getAuth, updateProfile } from "firebase/auth";
// import Swal from "sweetalert2";
// import useAxiousPublic from "../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`
const Register = () => {
    // const axiosPublic = useAxiousPublic()
    const auth = getAuth(app);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiousPublic()
    // const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("");
    const { createUser } = useContext(AuthContext)


    const onSubmit = async (data) => {
        console.log(data)
        // Check if passwords match

        const imageFile = { image: data.photoUrl[0] }
        console.log(imageFile)
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const imageUrl = imageRes.data.data.display_url;
        console.log(imageUrl)

            createUser(data.email, data.password)
                .then(result => {
                    const email = data.email
                    const name =data.name


                    // const userinfo={
                    //     email,
                    //     name,

                
                    // }
                    console.log(email)
                    console.log(name)
                    const loggedUser = result.user
                    console.log(loggedUser);
                    // data.name, imageUrl
                    updateProfile(auth.currentUser, {
                        displayName: data.name, photoURL: imageUrl
                      }).then((result) => {
                        // Profile updated!
                        console.log(result)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User has been created",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        // ...
                      }).catch((error) => {
                       console.error(error);
                      });
                      console.log(result.user)
                      console.log('registered')
                })
                    .catch(error => console.error(error))

            // console.log(data);

    };


    return (
        <>

            <div>
                <div>

                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col lg:flex-row-reverse md:gap-44">
                            <div className=" md:w-1/2">

                                <Lottie animationData={animationData} />

                            </div>
                            <div className="card flex-shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <h1 className="text-4xl font-bold">Registration here</h1>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input type="text" placeholder="Name" {...register("name", { required: true })} name="name" className="input input-bordered" />
                                            {errors.name && <span className="text-red-600">Name is required</span>}
                                        </div>

                                    </div>



                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>

                                        </label>
                                        <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" />
                                        {errors.email && <span className="text-red-600">Email is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password"  {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })} placeholder="password" className="input input-bordered" />
                                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                    </div>

                                    {errorMsg && (
                                        <p className="text-red-500 font-semibold text-center text-base my-2">
                                            {errorMsg}
                                        </p>
                                    )}

                                    <div className='form-control w-full my-6'>
                                        <label className="label">
                                            <span className="label-text">Photo</span>
                                        </label>
                                        <input {...register('photoUrl', { required: true })} type="file" className="file-input w-full max-w-xs" />
                                    </div>
                                    <div className="form-control mt-6">
                                        <input className="btn btn-error text-base" type="submit" value="Register" id="" />
                                    </div>



                                </form>

                                <p className='text-center'><small>New User? <Link to="/login"><span className='border-0 border-b-2 hover:border-sky-400'>Already have an account?</span></Link></small></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;