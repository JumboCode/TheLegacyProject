type InputBoxProps = {
  label: string,
  content: string
}

const InputBox = ({label, content}: InputBoxProps) => {
  return (
    <label className="flex w-full flex-col text-lg text-neutral-800 \
                      p-4 bg-off-white rounded text-left drop-shadow-md mt-2">
      {label}
      <input className="p-2 bg-off-white border-b-2 border-dark-sage"
             name={label}
             value={content}
            //  onChange={handleChange}
            //  onClick={handleClick(keyname)}
            //  onBlur={handleBlur}
             >
      </input>
    </label>
  );
}

export default InputBox;