export default function Input({ label, children, dispatch, id }) {

  return (
    <div className='flex flex-col small:flex-row justify-around items-center my-2'>
      <p id={`${id}-label`} className='text-gray-300 selection:bg-gray-300 selection:text-[#363130]'>
        {label}
      </p>
      <div className='flex justify-around items-center text-[1.8rem] w-[40%]'>
        <p
          id={`${id}-decrement`}
          className='px-3 scale-[1.8] small:scale-125 text-orange-700 selection:bg-orange-700 selection:text-[#363130] hover:text-orange-600 cursor-pointer '
          onClick={() => dispatch({ type: 'subtract', source: id })}
        >
          -
        </p>
        <p id={`${id}-length`} className='text-orange-200 mx-6 small:mx-2 text-center selection:bg-orange-200 selection:text-[#363130]'>{children}</p>
        <p
          id={`${id}-increment`}
          className='px-3 scale-[1.6] small:scale-125 text-orange-700 hover:text-orange-600 cursor-pointer selection:bg-orange-700 selection:text-[#363130]'
          onClick={() => dispatch({ type: 'add', source: id })}
        >
          +
        </p>
      </div>
    </div>
  );
}
