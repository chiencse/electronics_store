'use client'

import { FormEventHandler, SyntheticEvent } from "react";

export default function FormComponent() {
    const submitCredentialForLogin: FormEventHandler<HTMLFormElement> = (event: SyntheticEvent) => {
        event.preventDefault();

        console.log(event?.target);
    };

    return (
        <div className="w-80 rounded-md bg-slate-200 mx-auto p-5">
            <form className="flex flex-col justify-center items-center" onSubmit={submitCredentialForLogin}>
                <label htmlFor="username_or_email" className="text-xs font-semibold pb-2 text-left">username/email</label>
                <input name="username_or_email" className="bg-slate-100 rounded-md w-2/3 border-solid border-2 border-lime-700 p-3"/>

                <div className="rounded-md px-12 bg-lime-700 mt-6 text-slate-100 py-2">
                    <input type="submit" value="log in" />
                </div>
            </form>
        </div>
    );
}