import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import './App.css';
import Axios from "axios"

function App() {

	const [small_header, setsmall_header] = useState("");
	const [brief_description, setbrief_description] = useState("");
	const [status, setstatus] = useState('');
	
	const [newstatus,setnewstatus] = useState('');
	const [newbrief_description, setnewbrief_description] = useState('');
	
	const [worklist, setWorklist] = useState([]);
	
	const sortbystatus = () => {
		const sorted = [...worklist].sort((a,b) => (a.status > b.status ? -1 : 1));
		
		setWorklist(sorted);
		
	
	};
	const addwork = () => {
		Axios.post("http://localhost:3001/addwork", {
			small_header:small_header, 
			brief_description:brief_description, 
			status:status});
			
		setWorklist([...worklist,{work_title:small_header, description:brief_description, status:status},
		]);
		
		
	};
	
	const deletework = (work_id) => {
	
		Axios.delete("http://localhost:3001/deletework",{
		params:{
			id: work_id
		}});
		
		setWorklist(worklist.filter(item => item.id !== work_id));
		
	
	};
	
	const updatestatus = (id) => {
	
		Axios.put("http://localhost:3001/updatestatus",{
			newstatus: newstatus,
			work_id: id,
		
		});
		
		setWorklist(worklist.map(item => item.id === id ? {...item, status: newstatus}: item));
		
		setnewstatus("");
	
	};
	
	
	const updatedescription = (id) => {
	
		Axios.put("http://localhost:3001/updatedescription",{
			newbrief_description: newbrief_description,
			work_id: id,
		
		});
		
		setWorklist(worklist.map(item => item.id === id ? {...item, description: newbrief_description}: item));
		setnewbrief_description("");
	
	};
	
	useEffect(()=>{
			Axios.get("http://localhost:3001/getworks").then((response)=>
				{
				setWorklist(response.data);}
			
			);
	
	
	}, []);
	
  return (
    <div className="App"> 
		<h1> My To-Do List </h1>
		
		<div className="entry" id="form">
			<label> Work Title: </label>
			<input type="text" name="small_header"  onChange={(event)=> {
					setsmall_header(event.target.value);
			}}/>
			<label> Description: </label>
			<input type="text" name="brief_description" onChange={(event)=> {
					setbrief_description(event.target.value);
			}}/>
			<label>Choose Status:</label>
			<select id="status" name="status" onChange={(event)=> {
					setstatus(event.target.value);
			}}>
				<option value="Status">Status</option>
				<option value="Started">Started</option>
				<option value="In_Progress">In Progress</option>
				<option value="Completed">Completed</option>
			</select>
			<button onClick = {addwork}> Add </button>
			<button onClick = {sortbystatus}> Sort </button>
			{worklist.map((entity)=>{
				return (
				<div className = "entity">
					<h1> {entity.work_title}</h1>
					
					<p> {entity.description}</p>
					
					<h3 className = {entity.status}>{entity.status}</h3>
					
					<button onClick = {() => {deletework(entity.id)}}> Delete </button>
					
					<label>New Status:</label>
					<select id="newstatus" name="newstatus" onChange={(event)=> {
					setnewstatus(event.target.value);
					}}>
						<option value="Status">Status</option>
						<option value="Started">Started</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
					
					<button onClick = {()=> {updatestatus(entity.id)}}> Update Status</button>
					
					<label> Description: </label>
					<input type="text" name="newbrief_description" onChange={(event)=> {
					setnewbrief_description(event.target.value);
					}}/>
					
					<button onClick = {() => {updatedescription(entity.id)}}> Update Description</button>
					
				</div>
				);
			
			})}
			
		</div>  
    </div>
  );
}

export default App;
