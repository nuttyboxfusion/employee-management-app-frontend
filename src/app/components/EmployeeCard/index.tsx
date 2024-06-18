import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IEmployee } from "@/app/models";
import styles from "./employeeCard.module.css";

interface EmployeeCardProps {
  employee: IEmployee;
  index: number; // Index to show count
  onEdit: (employee: IEmployee) => void;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  index,
  onEdit,
  onDelete,
}) => {

  return (
    <Card className={styles.card}>
      <div className={styles.cardContent}>
        <p className={styles.count}>{index + 1}</p>
        <div className={styles.employeeDetails}>
          <div className={styles.employeeDetail}>
            <p>{employee.firstName} {employee.lastName}</p>
          </div>
          <div className={styles.employeeDetail}>
            <p>{employee.email}</p>
          </div>
          <div className={styles.employeeDetail}>
            <p>{employee.phoneNumber}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            style={{ color: "blue" }}
            onClick={() => onEdit(employee)}
          />
          <Button
            type="text"
            size="small"
            style={{ color: "red" }}
            icon={<DeleteOutlined />}
            onClick={() => onDelete(employee.id)}
          />
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
