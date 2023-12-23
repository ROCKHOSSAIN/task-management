import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useLoaderData } from 'react-router-dom';

const Task = () => {
    const loadedData = useLoaderData();
    console.log(loadedData)
    const filterdata = loadedData?.filter((filterstatus) => filterstatus.status === 'todo')
    const todoTaskIds = filterdata?.map((task) => task._id) || [];
    console.log(todoTaskIds)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item:{id:todoTaskIds },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      console.log(isDragging)
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop:(item)=>addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))
      console.log(isOver)
  
      const addItemToSection=(id)=>{
        console.log("dropped",id)
      }
    return (
        <div>


            <div>
                <Link to='createTask'>  <h1 className='btn ml-2 md:ml-[800px] mt-10 btn-success mx-auto text-center mb-10'>Create Task</h1></Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-20 md:ml-[200px] '>
                <div>

                    <h1 className='bg-gray-300 w-[400px] p-2 text-center'>To-Do</h1>
                    <div ref={drag} className='flex flex-col gap-1 '>
                        {filterdata &&
                            filterdata.length > 0 &&
                            filterdata.map((user, index) => (
                                <div key={user._id} className="card w-96 mt-5 shadow-xl bg-sky-300">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {user.title}
                                            <div className="badge badge-secondary"> {user.Priority}</div>
                                        </h2>
                                        <p>{user.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">Deadline: {user.date}</div>
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>

                <div  ref={drop}>

                    <h1 className='bg-pink-300 w-[400px] p-2 text-center'>Ongoing</h1>
                </div>

                <div>
                    <h1 className='bg-violet-400 w-[400px] p-2 text-center'>Completed</h1>
                </div>
            </div>
        </div>

    );
};

export default Task;