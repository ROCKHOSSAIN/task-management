import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import useAxiousPublic from '../../hooks/useAxiosPublic';
import JoditEditor from 'jodit-react';
import { FaCaretRight } from 'react-icons/fa';
import useAxiousPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
const CreateTask = () => {
    const axiosPublic = useAxiousPublic()

    const editor = useRef(null)
    const [content, setContent] = useState('')

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const sanitizedContent = new DOMParser().parseFromString(content, 'text/html').body.textContent;
        const formData = {
            title: data.title,
            date: data.date,
            Priority: data.Priority,
            description: sanitizedContent,
            status:"todo"
          };
          console.log(formData);
          axiosPublic.post('/tasksCollection',formData)
          .then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "task has been created",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch((error) => {
            // Handle error here
            console.error(error);
        });

    }
    return (
        <div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Title" {...register("title", { required: true })} name="title" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Title is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadlines</span>
                        </label>
                        <input type="date" placeholder="date" {...register("date", { required: true })} name="date" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Title is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Priority*</span>

                        </label>


                        <select defaultValue="default" {...register('Priority', { required: true })}
                            className="select select-bordered w-full ">
                            <option disabled value="default">Select your Priority</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>

                        </select>


                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text-alt">Description</span>
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                <button className='btn bg-red-700 hover:bg-red-700 mt-10 text-white'>
                    Create <FaCaretRight></FaCaretRight>
                </button>
            </form>
        </div>
    );
};

export default CreateTask;