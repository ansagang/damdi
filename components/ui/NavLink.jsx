import { useRouter } from 'next/router'
import Link from 'next/link';

export default function NavLink({ href, children, exact, className }) {
    const router = useRouter();
    const state = exact ? router.asPath === `${href}` ? `active ${className}` : `${className}` : router.asPath.split('?')[0].split('/')[1] === `${href.split('?')[0].split('/')[1]}` ? `active ${className}` : `${className}`
    return (
        <Link href={href} className={state}>
            {children}
        </Link>
    )
}