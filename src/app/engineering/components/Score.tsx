export default function Score(){
    return(
        <main className="flex h-screen w-[50vw]">
            <div className="flex absolute top-50 left-50 h-[80vh] w-[32vw] rounded-4xl bg-black">
                <div className="flex flex-col absolute right-4 bottom-4 h-[80vh] w-[32vw] rounded-4xl bg-white border-2 border-solid">
                    <div className="flex absolute left-28 top-5"><h2 className="text-9xl ">503</h2></div>
                    <div className="flex absolute left-10 top-52 flex-col gap-5">
                    <h3 className="flex item-center text-5xl">Easy: </h3>
                    <h3 className="flex item-center text-5xl">Mediums: </h3>
                    <h3 className="flex item-center text-5xl">Hard: </h3>
                    <h3 className="flex item-center pt-10 text-3xl">Active Days: </h3>
                    </div>
                    <div className="flex absolute left-38 top-120"><h3 className="pt-10 left-30 top-120 text-3xl">LEETCODE</h3></div>
                </div>

            </div>
        </main>
    )
}