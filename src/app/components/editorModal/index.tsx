import React, { use, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { IEmployee } from "@/app/models";
import dayjs from "dayjs";
import styles from "./EmployeeForm.module.css";

interface EmployeeFormProps {
  visible: boolean;
  employee: IEmployee | undefined;
  onSubmit: (values: IEmployee) => void;
  onCancel: () => void;
}

const { Option } = Select;

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  visible,
  employee,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...employee,
      dateOfBirth: employee ? dayjs(employee.dateOfBirth) : null,
    });
  }, [employee]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values as IEmployee);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={employee ? "Edit Employee" : "Add Employee"}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical">
        <div className={styles.formContent}>
          <div className={styles.formSection}>
            <Form.Item
              name="firstName"
              label="First Name"
              className={styles.formItem}
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              className={styles.formItem}
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                  message: "Please enter phone number",
                },
                {
                  pattern: /^\d+$/,
                  message: "Phone number must be digits only",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                  message: "Please select date of birth",
                },
                {
                  validator: (_, value) =>
                    value && value.isAfter(dayjs())
                      ? Promise.reject("Date of birth must be in the past")
                      : Promise.resolve(),
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Form.Item>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.formSection}>
            <Form.Item
              name="email"
              label="Email"
              className={styles.formItem}
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              className={styles.formItem}
              style={{ marginBottom: 0 }}
            >
              <div className={styles.inlineContainer}>
                <Form.Item
                  name={["address", "street"]}
                  className={styles.inlineFormItem}
                  rules={[{ required: true, message: "Please enter street" }]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
                <Form.Item
                  name={["address", "city"]}
                  className={styles.inlineFormItem}
                  rules={[{ required: true, message: "Please enter city" }]}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </div>
              <div className={styles.inlineContainer}>
                <Form.Item
                  name={["address", "state"]}
                  className={styles.inlineFormItem}
                  rules={[{ required: true, message: "Please enter state" }]}
                >
                  <Input placeholder="State" />
                </Form.Item>
                <Form.Item
                  name={["address", "postalCode"]}
                  className={styles.inlineFormItem}
                  rules={[
                    { required: true, message: "Please enter postal code" },
                  ]}
                >
                  <Input placeholder="Postal Code" />
                </Form.Item>
              </div>
              <Form.Item
                name={["address", "country"]}
                className={styles.inlineFormItemFullWidth}
                rules={[{ required: true, message: "Please enter country" }]}
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Form.Item>
          </div>
        </div>
        <div className={styles.skillsSection}>
          <Form.List
            name="skills"
            rules={[
              {
                validator: async (_, skills) => {
                  if (!skills || skills.length < 1) {
                    return Promise.reject(
                      new Error("At least one skill must be added")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className={styles.skillFormItem}>
                    <Form.Item
                      {...field}
                      key={index}
                      name={[field.name, "name"]}
                      label={`Skill ${index + 1}`}
                      className={styles.skillFormItemInline}
                      rules={[
                        { required: true, message: "Please input skill name" },
                      ]}
                    >
                      <Input placeholder="Skill Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      key={field.name}
                      name={[field.name, "yearsOfExperience"]}
                      label="Experience (years)"
                      className={styles.skillFormItemInline}
                      rules={[
                        {
                          required: true,
                          type: "number",
                          min: 0,
                          message: "Please input valid experience",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Experience"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "seniorityLevel"]}
                      label="Seniority Level"
                      className={styles.skillFormItemInline}
                      rules={[
                        {
                          required: true,
                          message: "Please input seniority level",
                        },
                      ]}
                    >
                      <Select placeholder="Select seniority level">
                        <Option value={1}>Junior</Option>
                        <Option value={2}>Intermediate</Option>
                        <Option value={3}>Senior</Option>
                      </Select>
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        className={styles.dynamicDeleteButton}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Skill
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
