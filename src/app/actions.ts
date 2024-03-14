"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  getEmployees,
  verifyPin,
  getEmployeeClocks,
  TimeIn,
  Timeout,
} from "@/lib/directus";
import { isToday } from "@/lib/lib";

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
          const checkDate = isToday(latest.Clock_In_Timestamp);
          //if same day then user already logs today
          //now check if the entry clock out if not null
          if (checkDate) {
            if (latest.Clock_Out_Timestamp === null) {
              await Timeout(latest.id);
              revalidatePath("/");
              return {
                message: `timeout`,
                error: undefined,
                fieldValues: { username: "", pin: "" },
              };
            } else {
              return {
                message: `already`,
                error: "alreadylogged",
                fieldValues: { username: "", pin: "" },
              };
            }
          } else {
            await TimeIn(emp.id);
            revalidatePath("/");
            return {
              message: `timein`,
              error: undefined,
              fieldValues: { username: "", pin: "" },
            };
          }
        } else {
          await TimeIn(emp.id);
          revalidatePath("/");
          return {
            message: `timein`,
            error: undefined,
            fieldValues: { username: "", pin: "" },
          };
        }
      } else {
        return {
          message: `incorrectpin`,
          error: "notpin",
          fieldValues: { username: data.username, pin: data.pin },
        };
      }
    } else {
      return {
        message: `usernotfound`,
        error: "nouser",
        fieldValues: { username: data.username, pin: data.pin },
      };
    }
  } catch (e) {
    return {
      message: `servererror`,
      error: "internal",
      fieldValues: { username: data.username, pin: data.pin },
    };
  }
}
