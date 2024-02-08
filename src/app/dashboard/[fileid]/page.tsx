import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound, redirect, useRouter } from 'next/navigation';

interface PageProps {
    params: {
        fileid: string
    }
}

const Page = async({ params }: PageProps) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()


    const { fileid } = params;

    
    if(!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`)

    const file = await db.file.findFirst({
        where: {
            id: fileid,
            userId: user.id
        }
    })

    if(!file) notFound()

    return (
        <div>
            <h1>{fileid}</h1>
            <h1>can only be accessed by {user.id}</h1>
        </div>
    );
}

export default Page;
