import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";



const NotFoundPage = () => {
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src="/images/logo.svg" width={48} height={48} alt={`${APP_NAME}`} priority />
        <div className="p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Not Found</h1>
            <p className="text-destructive">
                Could not found requested page
            </p>
            <Link href="/" className="mt-4 ml-2 underline underline-offset-2">Back to Home</Link>
        </div>
    </div>;

}


 
export default NotFoundPage;