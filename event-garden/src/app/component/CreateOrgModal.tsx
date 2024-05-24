import React from 'react';

type CreateOrgModalProps = {
    show : boolean
    handleCreate : (a:any) => void;
};

const CreateOrgModal:React.FC<CreateOrgModalProps> = ({show,handleCreate}) => {
    
    return (
        <div className= 'fixed z-10'>
            <form onSubmit={handleCreate}>
      <div className="modal-overlay inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-bold">Create Organization</h2>
          </div>
          <input placeholder="Organization Name" name='name' className="border border-gray-300 rounded-lg p-2 w-full" />
          <button type='submit' className="text-gray-500 hover:text-gray-600 focus:outline-none">
              Create
            </button>
        </div>
      </div>
      </form>
    </div>
    )
}
export default CreateOrgModal;