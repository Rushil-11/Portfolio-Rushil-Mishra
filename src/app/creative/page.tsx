import Display from "./Display"
export default function Creative(){
    return(
        <main className="flex flex-col">
            <div className="flex mt-10 bg-white h-screen w-screen justify-center">
                <h2 className="flex absolute text-4xl w-60 text-center top-85">Designing and Creative Work</h2>
                <Display/>
            </div>
            <div className="flex bg-blue-500 h-screen w-screen">

            </div>
        </main>
    )
}