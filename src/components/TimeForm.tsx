"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";
import { IEmployees, ClockData } from "@/app/types";
import { Input } from "./ui/input";
import { Terminal } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Time from "./Time";
import Image from 'next/image'
import { Separator } from "./ui/separator";
import clsx from "clsx";
import { useEffect, useRef } from "react";


interface IInitial {
    message: string,

    fieldValues: {
        username: string,
        pin: string
    },
    error: string
}

const initialState: IInitial = {
    message: "",
    fieldValues: {
        username: "",
        pin: ""
    },
    error: ""
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className="button rounded-lg text-sm" type="submit" aria-disabled={pending}>
            {
                pending ? "Submitting..." : "Time In/Out"
            }
        </button>
    );
}

export function TimeForm({ data, clock }: { data: IEmployees[], clock: ClockData[] }) {

    const [state, formAction] = useFormState(createTodo, {
        message: "",
        fieldValues: {
            username: "",
            pin: ""
        },
        error: ""
    });

    const formRef = useRef<HTMLFormElement>(null)

    // let filtered
    // if (state && state.id) {
    //     filtered = data.filter(item => item.id === state.id)
    // }

    useEffect(() => {
        if (state.message === "timein" || state.message === "timeout" || state.message === "already") {
            formRef.current?.reset()
        }
    }, [state])


    return (
        <div className="container relative h-full min-h-screen flex-col items-center justify-center lg:px-0">
            <div className=" h-full min-h-screen">
                <div className="mx-auto flex h-full min-h-screen w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <form ref={formRef} action={formAction} className="flex items-center flex-col gap-3">
                        <Image
                            src="/logo.png"
                            alt="zanda logo"
                            width={100}
                            height={100}
                            className="mb-2"
                        />
                        <Time />
                        <Input type="text" defaultValue={state.fieldValues?.username} id="username" name="username" placeholder="Enter your username..." required className={clsx("", state.error ? "border-red-400" : "")} />
                        <Input type="password" defaultValue={state.fieldValues?.pin} id="pin" name="pin" placeholder="Enter your pin..." required className={clsx("", state.error ? "border-red-400" : "")} />
                        <div className="my-3 grid grid-cols-3 items-center" >
                            <Separator />
                            <p className="bg-background text-xs px-2 text-muted-foreground text-center uppercase col-span-">IN / OUT</p>
                            <Separator />

                        </div>
                        <SubmitButton />
                        {
                            state.error === "alreadylogged" &&
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    You already logged for today...
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            state.message === "timein" &&
                            <Alert className="border-[#296366] text-[#296366]">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads Up!</AlertTitle>
                                <AlertDescription>
                                    Time In Success! Have a nice day!
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            state.message === "timeout" &&
                            <Alert className="border-[#296366] text-[#296366]">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads Up!</AlertTitle>
                                <AlertDescription>
                                    Time Out Success! See you tomorrow!
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            state.error === "nouser" &&
                            <Alert variant={"destructive"}>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Try again!</AlertTitle>
                                <AlertDescription>
                                    User does not exist...
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            state.error === "internal" &&
                            <Alert variant={"destructive"}>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>{"It's us not you..."}</AlertTitle>
                                <AlertDescription>
                                    Internal server error
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            state.error === "notpin" &&
                            <Alert variant={"destructive"}>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>{"Try again!"}</AlertTitle>
                                <AlertDescription>
                                    Incorrect pin. Try using 1234 :D
                                </AlertDescription>
                            </Alert>
                        }
                        <p aria-live="polite" className="sr-only" role="status">
                            {state?.message}
                        </p>
                    </form>
                </div>
            </div>
            {/* <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                <Image
                    src={"/background.png"}
                    alt="background zanda"
                    width={1280}
                    height={1919}
                    className="h-screen w-full object-cover"
                />

                <div className={clsx("absolute inset-0 glass p-16",
                    state.id ? "" : "hidden"
                )}>
                    <User id={state.id} data={data} clock={clock} />
                </div>

            </div> */}
        </div>



    );
}
