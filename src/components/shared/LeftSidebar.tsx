import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutation'
import { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/lib/types'
import { useLocation  } from 'react-router-dom'

const LeftSidebar = () => {
    const { pathname } = useLocation()
    const {mutate: signOut, isSuccess } = useSignOutAccount()
    const {user} = useAuthContext()
    const navigate = useNavigate()

    useEffect(
        () => {
            if (isSuccess) navigate(0)
        }, [isSuccess]
    )
  return (
    <nav className="leftsidebar md:h-full">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            className="h-14 w-14 rounded-full"
            alt="profile"
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}>
                <NavLink
                  className="flex gap-3 items-center p-3"
                  to={link.route}>
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        onClick={() => signOut()}
        variant={"ghost"}
        className="shad-button_ghost mt-20 pb-8">
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium ">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar