import { useMediaQuery } from 'react-responsive'

export const ShowOnDesktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 480 })
    return isDesktop ? children : null
}
export const ShowOnMobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 480, minWidth: 320 })
    return isMobile ? children : null
}
