import React,{useState,useEffect} from "react";
import EmployeeService from "../service/EmployeeService";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";

const AddEmployeeComponent =()=>{

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const {id}=useParams();
   // const useParams=useParams();
    //const id = useParams.id;

    const employeeData={firstName,lastName,email};//bundle the input from user

    //save data to api and navigate when successfull
    function saveEmployee(e){
        e.preventDefault();
        if(employeeData.firstName!=="" && employeeData.lastName!=="" && employeeData.email!==""){
              if(id){
                EmployeeService.updateEmployee(id,employeeData)
                .then(navigate("/employee"))
                .catch(e=>console.log(e))
              }else{
            EmployeeService.saveEmployee(employeeData)
        .then(navigate("/employee"))
        .catch(e=>console.log(e));
              }
        }else{
            alert("Please ,fill in all input fields")
        }
        
    }

    function title(){
        if(id){
            return "Update Employee"
        }else{
            return "Add Employee"
        }
    }

    useEffect(()=>{
        if(id){
        EmployeeService.getEmployeeById(id)
            .then(res=>{
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            })
            .catch(e=>console.log(e));
        }
    },[]);

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h2 className="text-center">{title()}</h2>
                        <div className="card-body">
                            <form >
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" 
                                    value={firstName}
                                    onChange={(e)=>setFirstName(e.target.value)} 
                                    placeholder="Enter First Name"/>
                                </div>
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" 
                                    value={lastName} 
                                    onChange={(e)=>setLastName(e.target.value)}
                                    placeholder="Enter Last Name"/>
                                </div>
                                <div className="form-group mb-2">
                                    <input type="email" className="form-control" 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="Enter Email"/>
                                </div>
                                <button onClick={(e)=>saveEmployee(e)} className="btn btn-success">save</button> { " " }
                                <Link to={"/employee"} className="btn btn-danger">cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddEmployeeComponent