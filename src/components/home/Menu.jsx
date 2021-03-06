import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonsMenu from '../util/ButtonsMenu'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { GiDrinkMe, GiWrappedSweet } from 'react-icons/gi'
import { FaHamburger } from 'react-icons/fa';
import styled from 'styled-components'

const Menu = (props) => {
    const navigate = useNavigate()

    return (
        <ContentMenu className='d-flex flex-col card mb-3 px-2 py-3 text-center align-items-center'>
            <h1 className='pt-1 color-white'>Nuestro Menu</h1>
            <div className="d-flex  align-items-strech mt-4 ">
                <div onClick={() => navigate('/promos')}>
                    <ButtonsMenu
                        ancho={'150px'}
                        alto={'150px'}
                        title={<h2 className='color-white'>Promos</h2>}
                        colorIcon={'black'}
                        bgColor={'#fc4b08'}
                        icon={<MdOutlineLocalOffer />} />
                </div>

                <div className='m-4'></div>
                <div onClick={() => navigate('/comidas')}>
                    <ButtonsMenu
                        ancho={'150px'}
                        alto={'150px'}
                        title={<h2 className='color-white'>Comidas</h2>}
                        colorIcon={'#fc4b08'}
                        bgColor={''}
                        icon={<FaHamburger />} />
                </div>

            </div>
            <div className="d-flex justify-content-center align-items-strech mt-4  ">
                <div onClick={() => navigate('/bebidas')}>
                    <ButtonsMenu
                        ancho={'150px'}
                        alto={'150px'}
                        title={<h2 className='color-white'>Bebidas</h2>}
                        colorIcon={'#fc4b08'}
                        bgColor={''}
                        icon={<GiDrinkMe />} />
                </div>
                <div className='m-4'></div>
                <div onClick={() => navigate('/postres')}>
                    <ButtonsMenu
                        ancho={'150px'}
                        alto={'150px'}
                        title={<h2 className='color-white'>Postres</h2>}
                        colorIcon={'#fc4b08'}
                        bgColor={''}
                        icon={<GiWrappedSweet
                        />} />
                </div>
            </div>
        </ContentMenu>
    )
}
export default Menu

const ContentMenu = styled.div`
    background-color:transparent;
    border:none;
`