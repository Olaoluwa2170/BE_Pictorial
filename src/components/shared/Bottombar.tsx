import { bottombarLinks } from '@/constants'
import { INavLink } from '@/lib/types'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
        {bottombarLinks.map((link: INavLink) => {
                  const isActive = pathname === link.route
                  return ( 
                    
                      <Link 
                        to={link.route}
                        className={`${
                          isActive && 'bg-primary-500 rounded-[10px]'
                        } flex-center flex-col gap-1 p-2 transition`}>
                          <img src={link.imgURL} alt={link.label} width={16} height={16} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                        <p className='text-light-2 tiny-medium'>{link.label}</p>
                      </Link>
                    
                  )
                })}
    </section>
  )
}

export default Bottombar