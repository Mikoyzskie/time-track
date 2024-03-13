

import { TimeForm } from "@/components/TimeForm";
import { getAllEmployees } from "@/lib/directus";
import { IEmployees } from "./types"


export default async function Home() {

  const all = await getAllEmployees()
  const employees = all!.map((employee: IEmployees) => {
    return employee
  })

  return (
    <main>
      <TimeForm data={employees} />
    </main>
  );
}
