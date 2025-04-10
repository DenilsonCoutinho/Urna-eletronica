import Image from "next/image";

import MyQuestions from "./myQuestions/myQuestions";

export default function Questions() {
    return (
        <div className="flex flex-col justify-center w-full items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
            <MyQuestions />
        </div>
    );
}
