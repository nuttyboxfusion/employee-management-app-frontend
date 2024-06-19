"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { IEmployee } from "@/app/models";
import { Button, Empty, Input, Pagination, Typography, message } from "antd";
import EmployeeCard from "@/app/components/EmployeeCard";
import { PlusOutlined } from "@ant-design/icons";
import EmployeeForm from "@/app/components/editorModal";
import {
  EmployeeProvider,
  useEmployeeAction,
  useEmployeeState,
} from "@/app/providers/employee";

const { Title, Text } = Typography;
const { Search } = Input;

export default function Employee() {
  const [modalVisible, setModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    selectEmployee,
    createEmployee,
    getAllEmployees,
    deleteEmployee,
    searchEmployee,
    updateEmployee,
    removeSelectedEmployee,
  } = useEmployeeAction();
  const { employees, employee } = useEmployeeState();
  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    if (employee) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [employee]);
  const handleSearch = async (value: string) => {
    try {
      searchEmployee(value);
      setCurrentPage(1); // Reset to the first page after search
    } catch (error) {
      console.error("Error searching employees:", error);
      message.error("Error searching employees");
    }
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      getAllEmployees();
      setCurrentPage(1); // Reset to the first page after clearing the search input
    }
  };

  const handleEdit = (employee: IEmployee) => {
    selectEmployee(employee);
  };

  const handleFormSubmit = (values: IEmployee) => {
    if (employee) {
      updateEmployee({ ...employee, ...values });
      removeSelectedEmployee();
    } else {
      createEmployee(values);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    removeSelectedEmployee();
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredEmployees = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <EmployeeProvider>
      <div className={styles.container}>
        <EmployeeForm
          visible={modalVisible}
          employee={employee}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <Title level={2} className={styles.title}>
              Employees
            </Title>
            <Text className={styles.subtitle}>
              There are {employees.length} employees
            </Text>
          </div>

          <div className={styles.searchFilterContainer}>
            <Search
              placeholder="Search by name or email"
              onSearch={handleSearch}
              className={styles.searchInput}
              onChange={handleInputChange}
              allowClear
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => setModalVisible(true)}
            >
              New Employee
            </Button>
          </div>
        </div>
        <div className={styles.employeeList}>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                index={employees.indexOf(employee)}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="There are no employees"
            />
          )}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={employees.length}
          onChange={handlePageChange}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </div>
    </EmployeeProvider>
  );
}
