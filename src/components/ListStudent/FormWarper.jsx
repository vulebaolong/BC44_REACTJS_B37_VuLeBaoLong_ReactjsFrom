import { Form } from "antd";
import ListStudent from "./ListStudent";

function FormWarper() {
    const [formUse] = Form.useForm();

    return <>
        <ListStudent form={formUse}/>
    </>;
}
export default FormWarper;
