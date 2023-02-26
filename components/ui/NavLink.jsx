import { useRouter } from 'next/router'
import Link from 'next/link';

export default function NavLink({ href, children, exact }) {
    const router = useRouter();
    const className = exact ? router.asPath === `${href}` ? "active" : '' : router.asPath.split('?')[0].split('/')[1] === `${href.split('?')[0].split('/')[1]}` ? "active" : ''
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}