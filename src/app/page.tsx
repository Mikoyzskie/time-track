import { TimeForm } from "@/components/TimeForm";
import { getAllEmployees, getAllClocks } from "@/lib/directus";
import { IEmployees, ClockData } from "./types"


export default async function Home() {

  const all = await getAllEmployees()
  const employees = all!.map((employee: IEmployees) => {
    return employee
  })
  const clock = await getAllClocks()
  const clocks = clock!.map((data: ClockData) => {
    return data
  })
  return (
    <main>
      <TimeForm data={employees} clock={clocks} />
    </main>
  );
}
