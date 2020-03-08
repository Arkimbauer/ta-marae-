import React, {useEffect, useContext, useState} from 'react'
import CartButton from '../CartButton'
import logic from '../../logic'
import Context from '../Context'
import Modal from '../Modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Results({ searchResult }) {

    const {setCat} = useContext(Context)
    const {items} = useContext(Context)
    const {interruptorItems, setInterruptorItems} = useContext(Context)
    
    const [apiMessage, setApiMessage] = useState()
    
    useEffect(() => {
        setCat()
    },[items])

    const{ message, articles, error } = searchResult

    async function handleDeleteOnCart(event) { 
        event.preventDefault()
        let { target: { articleId: { value: articleId }  } } = event
        try {
            await logic.removeToCart(articleId)
            toast.info('Article deleted of your cart', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                })
            setInterruptorItems(!interruptorItems)
        } catch (error) {

        }
    }

    async function handleAddToCart(articleId, quantity) {
        try {
            quantity = Number(quantity)
            await logic.addToCart(articleId, quantity)
            toast.success('Article added in your cart', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                })
            setInterruptorItems(!interruptorItems)
        } catch ({message}) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                })
            setApiMessage(message)
        }
    }

    function handleModal() {
        setApiMessage(null) 
    }

    return <>
        <section className="searchResultMainContenedor">
            <section className="searchResult">
            {error && <h4>{error}</h4>}
                <h4>{message}</h4>
                {articles && articles.map(item => {
                    const {ref, title, description, img, price, quantity, id} = item
                    
                    return <ul key={id} className="searchResult__article" >
                        <li className="searchResult__article--param">Ref: {ref}</li>
                        <li className="searchResult__article--param">{title}</li>
                        <li className="searchResult__article--param searchResult__article--param-description">{description}</li>
                        <li className="searchResult__article--param searchResult__article--param-image"><img alt="" src={img}/></li>
                        <li className="searchResult__article--param">Price: {price} €</li>
                        <li className="searchResult__article--param">Stock: {quantity} uds</li>

                        {quantity === 0 && <section className="searchResult__out-of-stock"><h3>Out of stock</h3></section>}

                        {!items.some(element => element.item.article.id === id) && logic.isUserLogged() && quantity > 0 && <CartButton handleAddToCart={handleAddToCart} articleId={id} stock={quantity}/>}

                        {items.map(element => {

                            return element.item.article.id === id && <section className="searchResult__on-cart">
                                <h3 className="searchResult__on-cart--text">On cart {element.quantity}</h3>
                                <form onSubmit={handleDeleteOnCart}><button className="searchResult__on-cart--button">Remove<input type="text" hidden name="articleId" defaultValue={id}></input></button>
                                </form>
                            </section>})}

                    </ul>
                })}
            </section>
            {apiMessage && <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    /> }
            {setInterruptorItems && <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    /> }
        </section>
    </>
}

export default Results