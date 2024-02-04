import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id) redirect("/auth-callback?origin=dashboard")

    return(
        <>
            <h1>{user.id}</h1>
            <h1>{user.email}</h1>
            <h1>{user.given_name}</h1>
            <h1>{user.family_name}</h1>
            <LogoutLink>Log out</LogoutLink>
        </>
    )
}

export default page