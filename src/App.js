import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route } from 'react-router-dom'


function App() {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()

            setTasks(tasksFromServer)
        }
        
        getTasks()

    }, [])

    //Fetch tasks
    const fetchTasks = async () => {
        try{
            const res = await fetch('http://localhost:5001/tasks')
            
            const data = await res.json()

            return data

        } catch(e){

        }
    }

     //Fetch task
     const fetchTask = async (id) => {
        try{
            const res = await fetch(`http://localhost:5001/tasks/${id}`)
        
            const data = await res.json()
            return data

        } catch(e){

        }
    }


     //Add Task 
     const addTask = async (task) => {

        const res = await fetch(`http://localhost:5001/tasks`, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
         })

        setTasks([...tasks, await res.json()])
    }

    // Delete task 
    const deleteTask = async (id) => {

        await fetch(`http://localhost:5001/tasks/${id}`, {
                method: 'DELETE'
        })

         setTasks(tasks.filter((x)=> x.id !== id))
    }
    
    //Toggle Reminder
    const ToggleReminder = async(id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5001/tasks/${id}`, {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const newData = await res.json()

        setTasks(tasks.map((task) => 
             task.id === newData.id? newData : task
            )
        )
    }

    return (
        <Router>


        <div className="container">
                <Header title="hello" onAdd={ ()=> setShowAddTask (!showAddTask) } showAdd={showAddTask}/>
                
                <Route 
                path='/' 
                exact 
                render={(props)=> (
                    <>

                    { showAddTask && <AddTask  onAdd={addTask}/>}

                    {tasks.length > 0? <Tasks 
                    tasks={tasks} 
                    onToggle={ToggleReminder}
                    onDelete={deleteTask}
                    /> : 'No tasks to show'}

                    </>
                )} />      

                <Route path='/about' component={About} />    
                <Footer />    
        </div>
        </Router>
    );
}

export default App;
