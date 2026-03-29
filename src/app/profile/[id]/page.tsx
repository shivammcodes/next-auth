const page = async({params} : any) => {
    const resolvedParams=await params;
  return (
    <div className="h-full w-full flex items-center justify-center text-white text-3xl">{resolvedParams.id}</div>
  )
}

export default page