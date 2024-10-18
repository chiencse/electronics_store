'use client'

import { FormEventHandler, SyntheticEvent, useState } from "react";

type CredentialInput = {
    username_or_email: { value: string },
    password?: { value: string },
};

export default function FormComponent() {
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const isUsernameOrEmailValid = async (value: string) => {
        return value?.length && value.indexOf('trung') > -1;
    }

    const submitCredentialForLogin: FormEventHandler<HTMLFormElement> = async (event: SyntheticEvent) => {
        event.preventDefault();

        const targetValue = event?.target as ((typeof event.target) & CredentialInput);

        const username_or_email = targetValue?.username_or_email?.value;
        const username_or_emailValid = await isUsernameOrEmailValid(username_or_email);
        if (username_or_emailValid) {
            setShowPasswordInput(true);
        }

        // console.log("=======>", targetValue?.username_or_email?.value);
    };

    return (
        <div className="w-2/3 rounded-md bg-slate-200 mx-auto p-5">
            <form className="flex flex-col justify-center items-center gap-8" onSubmit={submitCredentialForLogin}>
                <div className="w-2/3">
                    <label htmlFor="username_or_email" className="text-xs font-semibold pb-2 text-left pr-3">username/email</label>
                    <input name="username_or_email" className="bg-slate-100 rounded-md w-2/3 border-solid border-2 border-lime-700 p-3"/>
                </div>

                {
                    showPasswordInput &&
                    (<div className="w-2/3">
                        <label htmlFor="password" className="text-xs font-semibold pb-2 text-left pr-3">Password</label>
                        <input name="password" className="bg-slate-100 rounded-md w-2/3 border-solid border-2 border-lime-700 p-3"/>
                    </div>)
                }

                <div className="rounded-md px-4 bg-lime-700 mt-6 text-slate-100 py-2 w-1/3">
                    <input type="submit" value="log in" />
                </div>

            </form>
        </div>
    );
}