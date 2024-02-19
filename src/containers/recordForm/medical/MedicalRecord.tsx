import TextInput from "./TextInput";

const MedicalRecordInputs = () => {
  const handleInputChange = () => {
    console.log("change");
  };
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        title="標題"
        name="title"
        star={true}
        onChange={handleInputChange}
      />
      <TextInput title="醫院" name="hospital" onChange={handleInputChange} />
      <TextInput title="獸醫師" name="doctor" onChange={handleInputChange} />
      <TextInput
        title="服用藥物"
        name="medicine"
        onChange={handleInputChange}
      />
      <TextInput title="臨床檢查" name="check" onChange={handleInputChange} />
      <TextInput
        title="居家注意事項"
        name="notice"
        onChange={handleInputChange}
      />
      <TextInput
        title="臨床檢查"
        name="check"
        isMoney
        onChange={handleInputChange}
      />
    </div>
  );
};

export default MedicalRecordInputs;
