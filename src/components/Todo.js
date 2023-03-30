import React from 'react'
import './todo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const Todo = (props) => {
  return (  
    <div className='task-wrapper'>
        {/* {console.log(props.task)} */}
        <div>{props.task.title}</div>
        <div className="button-group">
            <FontAwesomeIcon className='icon edit' icon={faEdit} onClick={()=>props.handleEdit(props.task)} />
            <FontAwesomeIcon className='icon trash' icon={faTrash} onClick={()=>props.handleRemove(props.task.id)} />
        </div>
    </div>
  ) 
}

export default Todo