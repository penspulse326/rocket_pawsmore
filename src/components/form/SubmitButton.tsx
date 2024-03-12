interface PropsType {
  children: React.ReactNode;
  disable: boolean;
}

function SubmitButton({ children, disable }: PropsType) {
  return (
    <button
      type='submit'
      disabled={disable}
      className={`${disable ? 'bg-note' : 'bg-primary'} mt-4 w-full rounded-full py-2 text-xl font-semibold leading-normal text-white`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
