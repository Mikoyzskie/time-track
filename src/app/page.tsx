import { TimeForm } from "@/components/TimeForm";
import { getAllEmployees, getAllClocks } from "@/lib/directus";
import { IEmployees, ClockData } from "./types"
import Image from "next/image"


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
    <main className="relative min-h-screen h-full">
      <Image
        src={"/background.jpg"}
        alt="background-image"
        width={2872}
        height={1592}
        className="h-screen w-full object-cover object-center"
      />
      <div className="absolute inset-0 glass">
        <TimeForm data={employees} clock={clocks} />
      </div>
    </main>
  );
}
