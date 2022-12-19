import { useState, useEffect } from 'react'
import '../public/output.css'
import Axios from 'axios';
import Table from './components/table';

function App() {
  const [values, setValues] = useState();
  const [listPeople, setListPeople] = useState();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  const handleClickButton = () => {
    Axios.post('http://localhost:3000/register', {
      Fname: values.Fname,
      Lname: values.Lname,
      endereco: values.endereco
    })
    console.log(values);
  }

  useEffect(() => {
    Axios.get('http://localhost:3000/getTeble').then((response) => {
      setListPeople(response.data);
    })
  })

  return (
    <div className=" h-max bg-slate-300 flex items-center  flex-col dark:bg-[#1f1d29] dark:text-[white] p-0 m-0">
      <div className="py-3 px-5 mt-5 flex flex-col items-center justify-center border-[3px] border-solid border-[black] dark:border-[white]">
        <h1 className='text-center mb-5'>Crud</h1>
        <input type="text" name='Fname' placeholder='First name' onChange={handleChangeValues} />
        <input type="text" name='Lname' placeholder='Last name' onChange={handleChangeValues} />
        <input type="text" name='endereco' placeholder='Endereço' onChange={handleChangeValues} />
        <button className='py-1 px-1 bg-black rounded-xl dark:bg-slate-50 dark:text-black' onClick={() => { handleClickButton() }}>Submit</button>
      </div>

      { typeof listPeople !== 'undefined'&& listPeople.map((value) => {
        return <Table
          listPeople={listPeople}
          setListPeople={setListPeople}
          key={value.id} 
          id={value.id}
          Fname={value.first_name}
          Lname={value.last_name}
          endereco={value.address}
          />
      })}
      
    </div>
  )
}

export default App
