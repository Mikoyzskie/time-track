"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  getEmployees,
  verifyPin,
  getEmployeeClocks,
  TimeIn,
} from "@/lib/directus";
import { isSameDate } from "@/lib/lib";

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    username: z.string().min(1),
    pin: z.string().min(1),
  });
  const parse = schema.safeParse({
    username: formData.get("username"),
    pin: formData.get("pin"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    const emps = await getEmployees(data.username);

    //check if user exists
    if (emps && emps.length > 0) {
      const emp = emps[0];
      //check if pin is valid
      const isValidPin = await verifyPin(data.pin, emp.employee_pin);
      if (isValidPin) {
        //check if user already has an entry on clock table
        const clocks = await getEmployeeClocks(emp.id);
        if (clocks && clocks.length > 0) {
          //check if the latest entry equals today
          const latest = clocks[0];
          const checkDate = isSameDate(latest.date_created);
          //if same day then user already logs today
          //now check if the entry clock out if not null
          if (checkDate) {
            if (latest.Clock_Out_Timestamp === null) {
              console.log("clock me out");
            } else {
              console.log("already logged today");
            }
            return { message: `test` };
          } else {
            await TimeIn(emp.id);
            revalidatePath("/");
            return { message: `User Valid`, id: emp.id };
          }
        } else {
          return { message: `test` };
        }
      } else {
        return { message: `Pin incorrect` };
      }
    } else {
      console.log(emps);
      return { message: "User not found" };
    }
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
