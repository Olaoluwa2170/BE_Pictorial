import { bottombarLinks } from '@/constants'
import { INavLink } from '@/lib/types'
import { NavLink, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
        {bottombarLinks.map((link: INavLink) => {
                  const isActive = pathname === link.route
                  return ( 
                    <li className={`leftsidebar-link group ${
                      isActive && 'bg-primary-500'
                    }`} key={link.label}>
                      <NavLink to={link.route}
                        className={"flex gap-4 items-center p-4"}>
                          <img src={link.imgURL} alt={link.label}  className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                        {link.label}
                      </NavLink>
                    </li>
                  )
                })}
    </section>
  )
}

export default Bottombar