import React from 'react';

type CreateOrgModalProps = {
    show : boolean
    handleCreate : (a:any) => void;
};

const CreateOrgModal:React.FC<CreateOrgModalProps> = ({show,handleCreate}) => {
    
    return (
      <div className='flex justify-center '>
        <div className= 'fixed z-10 mt-[35vh]'>
            <form onSubmit={handleCreate}>
      <div className="modal-overlay inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-black w-[100%] md:max-w-md rounded z-50 overflow-y-auto border-2  border-white  shadow-2xl shadow-slate-100 py-4 px-2">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-bold text-white">Create Organization</h2>
          </div>
          <input placeholder="Organization Name" name='name' className="border border-gray-300 rounded-lg p-2 w-full" />
          <div><button type="submit" className='flex justify-center items-center p-2 w-[100%] bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px]'>Continue</button></div>
              
        </div>
      </div>
      </form>
    </div>
    </div>
    )
}
export default CreateOrgModal;