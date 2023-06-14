"use client";

interface Props {
  setImg: (file: any) => void;
}

const InputFile: React.FC<Props> = ({ setImg }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImg(file);
  };
  return (
    <div className={`flex items-center justify-between`}>
      <label className="min-w-[100px]  ">Photos</label>
      <input
        type="file"
        className="w-full border p-3 outline-none "
        onChange={handleFileChange}
        accept="image/*"
        required
      />
    </div>
  );
};

export default InputFile;
