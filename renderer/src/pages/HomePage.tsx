export default function HomePage() {
    let isDefault = true

    return (
        <>
            <div className="relative w-full h-full">
                {isDefault ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-2xl font-bold mb-4">欢迎使用 SimpleChat</h1>
                        <p className="text-gray-600">请选择频道以开始交流。</p>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center ">
                        <span className="text-10">男的活着干嘛</span>
                    </div>
                )}
            </div>
        </>
    )
}
