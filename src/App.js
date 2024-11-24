import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './App.css';
import { Col, Container, Row, Table} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [formData, setFormdata] = useState(
    {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index:''
    }
  )
  let getValue=(event)=>{
    let oldData = {...formData}
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormdata(oldData)
  }
  
  let [userData, setUserData] = useState([]);
  let handleSubmit=(event)=>{
    event.preventDefault();
    if(!formData.uname || !formData.uemail || !formData.uphone || !formData.umessage) {
      toast.error("All fields are required!");
      return; // Stop further execution if validation fails
    }
    let currentUserDate={
      uname:formData.uname,
      uemail:formData.uemail, 
      uphone:formData.uphone,
      umessage:formData.umessage
    }
    if(formData.index===''){
      let checkfilteruser = userData.filter((v)=>v.uemail==formData.uemail || v.uphone==formData.uphone)
      if(checkfilteruser.length==1){
        toast.error("Allready phone or email exists");
      }
      else{
        let oldUserData = [...userData,currentUserDate]
        setUserData(oldUserData);
        setFormdata(
          {
            uname:'',
            uemail:'',
            uphone:'',
            umessage:'',
            index:''
          }
        )
      }
    }
    else{
      let editIdex = formData.index;
      let oldData = userData;
      let checkfilteruser = userData.filter((v,i)=>(v.uemail==formData.uemail 
                || v.uphone==formData.uphone) && i!=editIdex)
      if(checkfilteruser.length==1){
        toast.error("Allready phone or email exists");
      }
      else{
        oldData[editIdex]['uname'] = formData.uname;
        oldData[editIdex]['uemail'] = formData.uemail;
        oldData[editIdex]['uphone'] = formData.uphone;
        oldData[editIdex]['umessage'] = formData.umessage;
        setUserData(oldData);
        setFormdata(
          {
            uname:'',
            uemail:'',
            uphone:'',
            umessage:'',
            index:''
          }
        ) 
        toast.success("Update done...");
      }
    }
  }
  
  let deleteRow = (index)=>{
    let filterdataafterdelete = userData.filter((v,i)=>i!=index)
    setUserData(filterdataafterdelete)
    toast.success("Data deleted...");
  }
  
  let editRow = (indexnumber)=>{
    let editdata = userData.filter((v,i)=>i==indexnumber)[0]
    editdata['index'] = indexnumber
    setFormdata(editdata)
  }
  return (
    <Container fluid>
       <ToastContainer />
      <Container>
        <Row>
          <Col className='text-center py-5'>
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={handleSubmit}>
              <div className='pb-3'>
                <label className='form-label'>Name</label>
                <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-label'>Email</label>
                <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-label'>Phone</label>
                <input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control'/>
              </div>
              <div className='pd-3'>
                <label className="form-label">Message</label>
                <textarea className='form-control' onChange={getValue} value={formData.umessage} name='umessage' id='' rows="3"/>
              </div>
              <button className='btn btn-primary mt-4 mb-5'>
                {
                  formData.index!==''?'update':'save'
                }
              </button>
            </form>
          </Col>
          <Col lg={7}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userData.length>=1
                    ?
                    userData.map((obj, i)=>{
                      return(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{obj.uname}</td>
                          <td>{obj.uemail}</td>
                          <td>{obj.uphone}</td>
                          <td>{obj.umessage}</td>
                          <td>
                            <button onClick={()=>deleteRow(i)}>Delete</button>
                            <button onClick={()=>editRow(i)}>Update</button>
                          </td>
                        </tr>
                      )
                    }
                    )
                    :
                    <tr>
                      <td colSpan={6}>No Data</td>
                    </tr>
                  }
                </tbody>
              </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
