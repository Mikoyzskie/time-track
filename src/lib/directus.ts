import {
  createDirectus,
  staticToken,
  rest,
  verifyHash,
  readItems,
  createItem,
  updateItem,
  readItem,
} from "@directus/sdk";

const apiClient = "YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"
  ? createDirectus("https://zandatestcms.azurewebsites.net")
      .with(staticToken("YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"))
      .with(rest())
  : undefined;

const employees: any = "Employees";

export async function getEmployees(username: string) {
  return await apiClient?.request(
    readItems(employees, {
      fields: [
        "id",
        "Employee_Username",
        "employee_pin",
        "employee_name",
        "employee_icon",
        "Clock_Status",
        "bcrypt",
      ],
      filter: {
        Employee_Username: {
          _eq: username,
        },
      },
    })
  );
}

export async function getAllEmployees() {
  return await apiClient?.request(
    readItems(employees, {
      fields: [
        "id",
        "Employee_Username",
        "employee_pin",
        "employee_name",
        "employee_icon",
        "Clock_Status",
        "bcrypt",
      ],
    })
  );
}

export async function verifyPin(pin: string, hash: string) {
  return apiClient?.request(verifyHash(pin, hash));
}

const clocks: any = "Employee_Clocks";

export async function getEmployeeClocks(user: string) {
  return await apiClient?.request(
    readItems(clocks, {
      fields: ["*"],
      sort: ["-Clock_In_Timestamp"],
      filter: {
        Clock_User: {
          _eq: user,
        },
      },
      limit: 2,
    })
  );
}

export async function getAllClocks() {
  return await apiClient?.request(
    readItems(clocks, {
      fields: ["id", "Clock_User", "Clock_In_Timestamp", "Clock_Out_Timestamp"],
      sort: ["-Clock_In_Timestamp"],
      limit: 2,
    })
  );
}

export async function TimeIn(user: number) {
  let now = new Date();
  const offset = 8 * 60; // 8 hours * 60 minutes
  now.setMinutes(now.getMinutes() + offset);

  return await apiClient?.request(
    createItem(clocks, {
      Clock_User: user,
      Clock_In_Timestamp: now,
    })
  );
}

export async function Timeout(id: number) {
  let now = new Date();
  const offset = 8 * 60; // 8 hours * 60 minutes
  now.setMinutes(now.getMinutes() + offset);
  return await apiClient?.request(
    updateItem(clocks, id, {
      Clock_Out_Timestamp: now,
    })
  );
}
