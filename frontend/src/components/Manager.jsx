import { comma } from 'postcss/lib/list';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

const getPasswords=async ()=>{
    let req=await fetch("https://passwordmanagerbackend-fm5u.onrender.com/")
    const passwords = await req.json()
    setPasswordArray(passwords);
    console.log(passwords)
}

  useEffect(() => {
    getPasswords()
    
  }, []);

  const copyText = (text) => {
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "eyee.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async() => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    // if any such id exists ,delete it
          await fetch("https://passwordmanagerbackend-fm5u.onrender.com/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
    
    const newPassword = { ...form, id: uuidv4() };
    const updatedArray = [...passwordArray, newPassword];
    setPasswordArray(updatedArray);

    await fetch("https://passwordmanagerbackend-fm5u.onrender.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newPassword)})
   
    //localStorage.setItem("passwords", JSON.stringify(updatedArray));
    setForm({ site: "", username: "", password: "" });
    toast('Password saved successfully!', {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast('Error: Zero length for any field is not considered!', {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });
  }
};

  const deletePassword = async (id) => {
    console.log("deleting password with id :",id)
    if (confirm("Do you really want to delete this password?")) {
      const updated = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updated);
      //localStorage.setItem("passwords", JSON.stringify(updated));
      await fetch("https://passwordmanagerbackend-fm5u.onrender.com/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    console.log("editing password with id ",id)
    setForm({...passwordArray.filter(item => item.id === id)[0],id: id});
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer transition={Bounce} />
      
      {/* ✅ Prevent horizontal scroll */}
      <div className="overflow-x-hidden">

        {/* ✅ Background */}
        <div className="absolute top-0 -z-10 h-screen w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        
        {/* ✅ Container */}
        <div className="container mx-auto px-4 min-h-[85vh]">
          <h1 className='text-4xl font-bold'>
            <span className='text-purple-900'>&lt;</span>
            Pass<span className='text-purple-900'>OP/&gt;</span>
          </h1>
          <p className='text-purple-900 text-lg text-center font-bold'>Your Own Password Manager</p>

          {/* ✅ Form */}
          <div className='flex flex-col p-4 gap-8 items-center'>
            <input
              value={form.site}
              onChange={handleChange}
              placeholder='Enter website URL'
              className='rounded-lg border border-purple-900 w-full p-2 py-1'
              type='text'
              name='site'
              id='site'
            />
            <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
              <input
                value={form.username}
                onChange={handleChange}
                placeholder='Enter Username'
                className='rounded-lg border border-purple-900 w-full p-3 py-1'
                type="text"
                name='username'
              />
              <div className="relative w-full">
                <input
                  ref={passwordRef}
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className='rounded-lg border border-purple-900 w-full p-3 py-1'
                  name='password'
                />
                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                  <img ref={ref} className='w-7 h-7 p-1' src="eyee.png" alt="eye" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className='flex w-fit font-bold justify-center items-center border-2 border-purple-600 bg-purple-400 rounded-lg px-2 py-2 hover:bg-purple-500'
            >
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#000000"
              ></lord-icon>
              Save Password
            </button>
          </div>

          {/* ✅ Table Section */}
          <div className="passwords px-2 w-full">
            <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
            {passwordArray.length === 0 ? (
              <div>No passwords to show</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full mb-8 rounded-lg overflow-hidden">
                  <thead className='bg-purple-900 text-white'>
                    <tr>
                      <th className='py-2 px-4 border-2 border-white'>Site</th>
                      <th className='py-2 px-4 border-2 border-white'>Username</th>
                      <th className='py-2 px-4 border-2 border-white'>Password</th>
                      <th className='py-2 px-4 border-2 border-white'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-purple-200'>
                    {passwordArray.map((item, index) => (
                      <tr key={index}>
                        <td className='py-2 px-4 border-2 border-white text-center break-words'>
                          <div className='flex gap-2 justify-center items-center flex-wrap'>
                            <a href={item.site} target='_blank' className='text-black-600'>
                              {item.site}
                            </a>
                            <img onClick={() => copyText(item.site)} width={24} className='cursor-pointer' src="copy.gif" alt="copy" />
                          </div>
                        </td>
                        <td className='py-2 px-4 border-2 border-white text-center break-words'>
                          <div className='flex justify-center items-center gap-2 flex-wrap'>
                            {item.username}
                            <img onClick={() => copyText(item.username)} width={24} className='cursor-pointer' src="copy.gif" alt="copy" />
                          </div>
                        </td>
                        <td className='py-2 px-4 border-2 border-white text-center break-words'>
                          <div className='flex justify-center items-center gap-2 flex-wrap'>
                            {item.password}
                            <img onClick={() => copyText(item.password)} width={24} className='cursor-pointer' src="copy.gif" alt="copy" />
                          </div>
                        </td>
                        <td className='py-2 px-4 border-2 border-white text-center'>
                          <div className='flex justify-center gap-2'>
                            <span onClick={() => editPassword(item.id)} className='cursor-pointer'>
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#6c16c7"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span onClick={() => deletePassword(item.id)} className='cursor-pointer'>
                              <lord-icon
                                src="https://cdn.lordicon.com/jzinekkv.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#6c16c7"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
