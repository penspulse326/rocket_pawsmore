import ImageInput from "./ImageInput";
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
        placeholder="請輸入標題"
        star={true}
        onChange={handleInputChange}
      />
      <TextInput
        title="醫院"
        name="hospital"
        placeholder="請輸入醫院名稱"
        onChange={handleInputChange}
      />
      <TextInput
        title="獸醫師"
        name="doctor"
        placeholder="請輸入獸醫師名稱"
        onChange={handleInputChange}
      />
      <TextInput
        title="服用藥物"
        name="medicine"
        placeholder="請輸入藥品名稱"
        onChange={handleInputChange}
      />
      <TextInput
        title="臨床檢查"
        name="check"
        placeholder="請輸入臨床檢查結果"
        isArea
        onChange={handleInputChange}
      />
      <TextInput
        title="居家注意事項"
        name="notice"
        placeholder="請輸入居家注意事項"
        isArea
        onChange={handleInputChange}
      />
      <TextInput
        title="開銷"
        name="cost"
        placeholder="請輸入居家注意事項"
        isMoney
        onChange={handleInputChange}
      />
      <ImageInput />
    </div>
  );
};

export default MedicalRecordInputs;
