"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";
import { IEmployees } from "@/app/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Time from "./Time";
import { User } from "./User";
import Image from 'next/image'


const initialState = {
    message: "",
    id: ""
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className="button rounded-md" type="submit" aria-disabled={pending}>
            Time In/Out
        </button>
    );
}

export function TimeForm({ data }: { data: IEmployees[] }) {
    const [state, formAction] = useFormState(createTodo, initialState);

    let filtered
    if (state && state.id) {
        filtered = data.filter(item => item.id === state.id)
    }

    console.log(filtered);


    return (


        <div className="container relative hidden h-full max-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <form action={formAction} className="flex flex-col gap-3">
                        <Time />
                        <Input type="text" id="username" name="username" placeholder="Enter your username..." required />
                        <Input type="password" id="pin" name="pin" placeholder="Enter your pin..." required />
                        <SubmitButton />
                        <p aria-live="polite" className="sr-only" role="status">
                            {state?.message}
                        </p>
                    </form>
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                <Image
                    src={"/background.png"}
                    alt="background zanda"
                    width={1280}
                    height={1919}
                    className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 glass p-16">
                    <User />
                </div>
            </div>
        </div>



    );
}
